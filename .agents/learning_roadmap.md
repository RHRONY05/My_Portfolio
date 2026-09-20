# 3D Web Development & Motion Learning Roadmap

> **Student**: Rony  
> **Goal**: Master the mental models, vocabulary, architecture, and core theory of modern 3D web development (WebGL, Three.js, React Three Fiber, Framer Motion) alongside building the portfolio.  
> **Philosophy**: You don't need to memorize low-level boilerplate code—AI can write the syntax. But you **must understand what is happening under the hood**, how the GPU thinks, and how the architectural pieces fit together.

---

## 🗺️ Visual Architecture Map: How 3D Works on the Web

```
                       [ YOUR WEB BROWSER ]
                                │
                                ▼
                        [ HTML5 <canvas> ]
              (The 2D drawing viewport in the webpage)
                                │
                                ▼
                     [ Three.js / R3F Engine ]
         (Translates human-friendly 3D objects into math)
                                │
                                ▼
                     [ WebGL / WebGPU API ]
     (Low-level browser graphics protocol speaking to hardware)
                                │
                                ▼
                      [ YOUR COMPUTER'S GPU ]
   (Graphics Card calculating millions of pixels at 60 FPS)
```

---

## Module 1: 2.5D Multi-Plane Parallax & Motion Physics (For the Hero Cockpit)
*Focus: Creating organic depth without running a heavy 3D engine.*

- [ ] **1.1 What is Parallax & The Illusion of Depth?**
  - *Theory*: How the human eye perceives distance. Nearby objects move faster across your field of view than distant mountains/stars.
  - *Application*: Separating the Hero into 3 planes (Foreground Boy → Midground Workstation → Background Cityscape).
- [ ] **1.2 Normalized Mouse Coordinates (`-1 to +1`)**
  - *Theory*: Why we map screen pixels `(0 to 1920)` into relative coordinates `(-1 to +1)` so movement feels symmetrical from the center.
- [ ] **1.3 Spring Physics vs. Linear Transitions**
  - *Theory*: Why robotic linear movement looks fake, and how spring damping (`stiffness`, `damping`, `mass`) creates organic physical momentum.
- [ ] **1.4 GPU-Accelerated CSS (`transform: translate3d`)**
  - *Theory*: Why animating `top`/`left` causes lag (layout thrashing), while `translate3d` hands work directly to the GPU compositor.

---

## Module 2: 3D Web Fundamentals — The "Movie Set" Mental Model
*Focus: Understanding Three.js from the ground up.*

- [ ] **2.1 The History: What is WebGL and Why Three.js?**
  - *The Pre-history*: Before 2011, browsers couldn't render hardware-accelerated 3D.
  - *The Problem with raw WebGL*: To draw a simple colored cube in raw WebGL requires ~150 lines of complex C-like code (GLSL shaders, buffer pointers, matrix math).
  - *The Solution*: Ricardo Cabello (Mr.doob) created **Three.js** in 2010 to make 3D as simple as placing objects on a stage.
- [ ] **2.2 The "Movie Set" Analogy (The 5 Pillars of 3D)**:
  - **1. The Scene (`new THREE.Scene()`)**: The empty soundstage/room where all 3D actors live.
  - **2. The Camera (`PerspectiveCamera`)**: The director's lens looking into the stage.
    - *FOV (Field of View)*: How wide the lens sees (like a wide-angle vs telephoto lens).
    - *Aspect Ratio*: Width divided by height (`window.innerWidth / window.innerHeight`).
    - *Near & Far Clipping Planes*: The closest and furthest distance the camera can see before cutting off.
  - **3. The Mesh (`new THREE.Mesh(geometry, material)`)**: The physical 3D actor.
    - *Geometry*: The invisible wireframe skeleton (vertices and polygons that define shape).
    - *Material*: The skin/clothing wrapped over the wireframe (colors, roughness, metalness, textures).
  - **4. The Lights (`AmbientLight`, `DirectionalLight`, `PointLight`)**:
    - Without light, everything is pitch black! Ambient light lights everything evenly; directional light casts realistic sun-like shadows.
  - **5. The Renderer & The Render Loop (`requestAnimationFrame`)**:
    - The projector running **60 times every second** (60 FPS). In every frame, we slightly change rotation or position, and the renderer draws the new snapshot.

---

## Module 3: React Three Fiber (R3F) & Declarative 3D (For the 3D Comic Book)
*Focus: How React and Three.js work together seamlessly.*

- [ ] **3.1 Imperative vs. Declarative: Why React Three Fiber?**
  - *Imperative Three.js*: You manually type `scene.add(cube)`, track objects, and clean up memory.
  - *Declarative R3F*: You write 3D like standard JSX:
    ```jsx
    <Canvas>
      <ambientLight />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="#00ff94" />
      </mesh>
    </Canvas>
    ```
- [ ] **3.2 The Game Loop in React (`useFrame`)**
  - *Theory*: In standard React, changing state triggers a DOM re-render. In 3D, re-rendering the DOM 60 times a second would crash your browser!
  - *The Solution*: `useFrame((state, delta) => { meshRef.current.rotation.y += delta })` mutates the 3D object directly inside the GPU loop with zero React re-renders!
- [ ] **3.3 Texture Mapping (Wrapping the Comic Art)**
  - *Theory*: UV Mapping—how a 2D flat image file (like your comic cover) is stretched and pinned onto the faces of a 3D rectangular book mesh.
- [ ] **3.4 Hinge Rotations & The 3D Page Flip**
  - *Theory*: How pivot points work. A book page rotates around its spine edge (left origin `x: -0.5`), not its center!

---

## Module 4: 3D Interaction, Physics & Audio (For the Mahoraga Wheel & Realm Orbs)
*Focus: Making 3D tactile, interactive, and responsive.*

- [ ] **4.1 Raycasting: How Clicks Hit a 3D Object**
  - *Theory*: Your screen is a flat 2D piece of glass (`x, y` pixels), but the 3D world has depth (`x, y, z`).
  - *The Raycaster*: Shoots an invisible laser beam from your mouse cursor through the camera lens into 3D space. Whichever 3D mesh the laser touches first registers the `onClick` or `onPointerOver` event!
- [ ] **4.2 Rotational Inertia & Damping (The Mahoraga Wheel)**
  - *Theory*: When you spin a wheel, it shouldn't stop dead when you release the mouse. Friction and velocity damping allow it to spin down smoothly.
- [ ] **4.3 Audio-Visual Synchronization (Web Audio API)**
  - *Theory*: Triggering mechanical ratchet clicks whenever the rotation angle crosses an 8-spoke threshold (`angle % (Math.PI / 4)`).
- [ ] **4.4 The 60-FPS Performance Bible (DPR & Intersection Observers)**
  - *Theory*: Why retina mobile screens lag if you don't cap `dpr={[1, 1.5]}` and how to freeze the GPU loop when scrolled offscreen.

---

## Progress Log

| Date | Concept Covered | Applied Section | Mastery Status |
| :--- | :--- | :--- | :--- |
| *2026-09-20* | Roadmap Created & Mental Models Outlined | Foundations | Initialized |
