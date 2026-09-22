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

- [x] **1.1 What is Parallax & The Illusion of Depth?**
  - *Theory*: How the human eye perceives distance. Nearby objects move faster across your field of view than distant mountains/stars.
  - *Application*: Separating the Hero into 3 planes (Foreground Character → Midground Campsite & Canopy → Background Starry Sky).
- [x] **1.2 Normalized Mouse Coordinates (`-1 to +1`)**
  - *Theory*: Why we map screen pixels into relative coordinates `(-1 to +1)` so movement feels symmetrical from the center.
- [x] **1.3 Spring Physics vs. Linear Transitions**
  - *Theory*: Why robotic linear movement looks fake, and how spring damping (`stiffness`, `damping`, `mass`) creates organic physical momentum.
- [x] **1.4 GPU-Accelerated CSS (`transform: translate3d`)**
  - *Theory*: Why animating `top`/`left` causes lag (layout thrashing), while Framer Motion's hardware-accelerated transforms hand work directly to the GPU compositor.


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

- [x] **3.1 Imperative vs. Declarative: Why React Three Fiber?**
  - *Theory*: Imperative Three.js vs declarative R3F JSX structure.
- [x] **3.2 The Game Loop in React (`useFrame`)**
  - *Theory*: Mutating 3D mesh transforms directly on the GPU loop (`delta`, `THREE.MathUtils.damp`) without React re-renders.
- [x] **3.3 Texture Mapping (Wrapping the Comic Art)**
  - *Theory*: UV mapping, sRGB color spaces, and high-fidelity texture loading for cover and inner spreads.
- [x] **3.4 Hinge Rotations & The 3D Page Flip**
  - *Theory*: Concentric spine hinges (`[-width / 2, 0, pagesBlockThickness / 2]`), multi-leaf rotation offsets, and fanned resting angles.

---

## Module 4: 3D Interaction, Physics & Audio (For the Mahoraga Wheel & Realm Orbs)
*Focus: Making 3D tactile, interactive, and responsive.*

- [x] **4.1 Raycasting: How Clicks Hit a 3D Object**
  - *Theory*: Shooting rays from 2D mouse cursor coordinates to register direct clicks (`onClick`, `onPointerOver`) on 3D pages in real time.
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
| *2026-09-21* | 2.5D Parallax, Mouse Coordinates & Spring Physics | Section 01: Hero | Mastered |
| *2026-09-22* | 3D Book Rigging, Concentric Spine Hinge, UV Textures | Section 02: About | Mastered |
| *2026-09-23* | Multi-Leaf Kinematics, Raycasting & Synced Editorial | Section 02: About | Mastered |
