import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Cluster {
  x: number;
  y: number;
  name: string;
  count: number;
  angle: number;
  radius: number;
}

export function LeadClusterMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredCluster, setHoveredCluster] = useState<Cluster | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const clustersRef = useRef<Cluster[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize clusters
    const initClusters = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.3;

      clustersRef.current = [
        { x: 0, y: 0, name: 'Healthcare MN', count: 24, angle: 0, radius: baseRadius * 0.7 },
        { x: 0, y: 0, name: 'IT Services CA', count: 18, angle: Math.PI / 3, radius: baseRadius * 0.8 },
        { x: 0, y: 0, name: 'Logistics TX', count: 15, angle: (2 * Math.PI) / 3, radius: baseRadius * 0.6 },
        { x: 0, y: 0, name: 'Finance NY', count: 21, angle: Math.PI, radius: baseRadius * 0.75 },
        { x: 0, y: 0, name: 'Retail FL', count: 12, angle: (4 * Math.PI) / 3, radius: baseRadius * 0.65 },
        { x: 0, y: 0, name: 'Manufacturing OH', count: 9, angle: (5 * Math.PI) / 3, radius: baseRadius * 0.55 },
      ];

      // Calculate positions
      clustersRef.current.forEach((cluster) => {
        cluster.x = centerX + Math.cos(cluster.angle) * cluster.radius;
        cluster.y = centerY + Math.sin(cluster.angle) * cluster.radius;
      });
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initClusters();
    };
    resize();
    window.addEventListener('resize', resize);

    initClusters();

    let time = 0;
    let animationFrameId: number;

    const animate = () => {
      time += 0.01;

      // Clear canvas
      ctx.fillStyle = 'rgba(10, 5, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw central globe
      const globeGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        80
      );
      globeGradient.addColorStop(0, 'rgba(60, 13, 87, 0.8)');
      globeGradient.addColorStop(0.7, 'rgba(60, 13, 87, 0.4)');
      globeGradient.addColorStop(1, 'rgba(60, 13, 87, 0)');

      ctx.fillStyle = globeGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
      ctx.fill();

      // Draw grid lines on globe
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * 80,
          centerY + Math.sin(angle) * 80
        );
        ctx.stroke();
      }

      // Draw connection arcs to clusters
      clustersRef.current.forEach((cluster, index) => {
        const pulse = Math.sin(time * 2 + index) * 0.3 + 0.7;

        // Draw arc
        ctx.strokeStyle = `rgba(168, 85, 247, ${0.3 * pulse})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();

        // Curved line
        const controlX = (centerX + cluster.x) / 2;
        const controlY = (centerY + cluster.y) / 2 - 50;
        ctx.moveTo(centerX, centerY);
        ctx.quadraticCurveTo(controlX, controlY, cluster.x, cluster.y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw cluster node
        const clusterGradient = ctx.createRadialGradient(
          cluster.x,
          cluster.y,
          0,
          cluster.x,
          cluster.y,
          20
        );
        clusterGradient.addColorStop(0, `rgba(168, 85, 247, ${0.6 * pulse})`);
        clusterGradient.addColorStop(0.5, `rgba(139, 92, 246, ${0.3 * pulse})`);
        clusterGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');

        ctx.fillStyle = clusterGradient;
        ctx.beginPath();
        ctx.arc(cluster.x, cluster.y, 20 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Inner core
        ctx.fillStyle = `rgba(168, 85, 247, ${0.8 * pulse})`;
        ctx.beginPath();
        ctx.arc(cluster.x, cluster.y, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x: e.clientX, y: e.clientY });

      // Check if hovering over a cluster
      let foundCluster: Cluster | null = null;
      for (const cluster of clustersRef.current) {
        const dx = x - cluster.x;
        const dy = y - cluster.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 20) {
          foundCluster = cluster;
          break;
        }
      }
      setHoveredCluster(foundCluster);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        style={{ background: 'transparent' }}
      />

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredCluster && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: 'fixed',
              left: mousePos.x + 10,
              top: mousePos.y + 10,
            }}
            className="bg-black/90 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 pointer-events-none z-50"
          >
            <p className="text-[#EDEDED] mb-1">{hoveredCluster.name}</p>
            <p className="text-purple-300 text-sm">
              {hoveredCluster.count} new leads this week
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
