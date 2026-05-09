import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const COLORS = ['#a855f7', '#3b82f6', '#06b6d4', '#8b5cf6', '#60a5fa'];

const PhysicsWorld = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const { Engine, Render, Runner, Bodies, Body, Events, Mouse, MouseConstraint, World } = Matter;

    const engine = Engine.create({ gravity: { y: 0.4 } });
    const world = engine.world;

    const canvas = canvasRef.current;
    const width = canvas.offsetWidth || window.innerWidth;
    const height = canvas.offsetHeight || window.innerHeight;

    const render = Render.create({
      canvas,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
      },
    });

    // Walls (invisible)
    const walls = [
      Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true, render: { visible: false } }),
      Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true, render: { visible: false } }),
      Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true, render: { visible: false } }),
    ];
    World.add(world, walls);

    // Spawn shapes
    const shapes = [];
    for (let i = 0; i < 18; i++) {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const x = Math.random() * width;
      const y = -Math.random() * 400;
      const isCircle = Math.random() > 0.5;
      const body = isCircle
        ? Bodies.circle(x, y, Math.random() * 14 + 6, {
            restitution: 0.6,
            friction: 0.1,
            render: { fillStyle: color + '70' },
          })
        : Bodies.rectangle(x, y, Math.random() * 24 + 10, Math.random() * 24 + 10, {
            restitution: 0.5,
            friction: 0.1,
            render: { fillStyle: color + '60' },
          });

      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 3,
        y: Math.random() * 2,
      });
      shapes.push(body);
    }
    World.add(world, shapes);

    // Mouse interaction
    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    World.add(world, mouseConstraint);
    render.mouse = mouse;

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const handleResize = () => {
      render.canvas.width = canvas.offsetWidth;
      render.canvas.height = canvas.offsetHeight;
      render.options.width = canvas.offsetWidth;
      render.options.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      World.clear(world);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
    />
  );
};

export default PhysicsWorld;
