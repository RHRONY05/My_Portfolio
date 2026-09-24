"use client";

import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BookMeshProps {
  isOpen: boolean;
  onToggleOpen?: () => void;
  chapter?: number;
  onChapterChange?: (chapter: number) => void;
  rotationYOffset?: number;
  accentColor?: string;
}

export function BookMesh({
  isOpen,
  onToggleOpen,
  chapter = 1,
  onChapterChange,
  rotationYOffset = 0,
  accentColor = "#E5E5E5",
}: BookMeshProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const frontCoverRef = useRef<THREE.Group>(null);
  const leaf1Ref = useRef<THREE.Group>(null);
  const leaf2Ref = useRef<THREE.Group>(null);
  const leaf3Ref = useRef<THREE.Group>(null);
  const leaf4Ref = useRef<THREE.Group>(null);

  // Textures for covers and all 5 inner page spreads
  const [frontTexture, setFrontTexture] = useState<THREE.Texture | null>(null);
  const [backTexture, setBackTexture] = useState<THREE.Texture | null>(null);
  const [page1LeftTexture, setPage1LeftTexture] = useState<THREE.Texture | null>(null);
  const [page1RightTexture, setPage1RightTexture] = useState<THREE.Texture | null>(null);
  const [page2LeftTexture, setPage2LeftTexture] = useState<THREE.Texture | null>(null);
  const [page2RightTexture, setPage2RightTexture] = useState<THREE.Texture | null>(null);
  const [page3LeftTexture, setPage3LeftTexture] = useState<THREE.Texture | null>(null);
  const [page3RightTexture, setPage3RightTexture] = useState<THREE.Texture | null>(null);
  const [page4LeftTexture, setPage4LeftTexture] = useState<THREE.Texture | null>(null);
  const [page4RightTexture, setPage4RightTexture] = useState<THREE.Texture | null>(null);
  const [page5LeftTexture, setPage5LeftTexture] = useState<THREE.Texture | null>(null);
  const [page5RightTexture, setPage5RightTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    // 1. Front Cover (1024x1536)
    textureLoader.load("/images/about/book_cover.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      setFrontTexture(texture);
    });

    // 2. Back Cover (1024x1536)
    textureLoader.load("/images/about/back_cover.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      setBackTexture(texture);
    });

    // Chapter 01
    textureLoader.load("/images/about/page_01_left.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      setPage1LeftTexture(texture);
    });
    textureLoader.load("/images/about/page_01_right.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      setPage1RightTexture(texture);
    });

    // Chapter 02
    textureLoader.load("/images/about/page_02_left.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      setPage2LeftTexture(texture);
    });
    textureLoader.load("/images/about/page_02_right.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      setPage2RightTexture(texture);
    });

    // Chapter 03
    textureLoader.load("/images/about/page_03_left.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      setPage3LeftTexture(texture);
    });
    textureLoader.load("/images/about/page_03_right.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      setPage3RightTexture(texture);
    });

    // Chapter 04
    textureLoader.load("/images/about/page_04_left.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      setPage4LeftTexture(texture);
    });
    textureLoader.load("/images/about/page_04_right.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      setPage4RightTexture(texture);
    });

    // Chapter 05 (The AI Horizon & Shawshank Epigraph)
    textureLoader.load("/images/about/page_05_left.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      setPage5LeftTexture(texture);
    });
    textureLoader.load("/images/about/page_05_right.png", (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      setPage5RightTexture(texture);
    });

    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  // Dimensions: 20% LARGER (width: 2.35, height: 3.53 — exact 2:3 ratio)
  const width = 2.35;
  const height = 3.53;
  const coverThickness = 0.04;
  const pagesBlockThickness = 0.11;
  const pagesWidth = width - 0.045;
  const pagesHeight = height - 0.055;

  // Exact Champagne Ivory font color sampled directly from book_cover.png typography
  const BOOK_FONT_GOLD = "#F1DCC2";

  // Realistic Concentric Spine Hinge Math:
  // Cover opens to ~ -142.2 deg (-2.48 rad)
  const targetCoverAngle = isOpen ? -Math.PI * 0.79 : 0;
  // Leaf 1 turns when going to chapter 2, 3, 4, or 5 (~ -136.8 deg / -2.39 rad)
  const targetLeaf1Angle = isOpen && chapter >= 2 ? -Math.PI * 0.76 : 0;
  // Leaf 2 turns when going to chapter 3, 4, or 5 (~ -131.4 deg / -2.29 rad)
  const targetLeaf2Angle = isOpen && chapter >= 3 ? -Math.PI * 0.73 : 0;
  // Leaf 3 turns when going to chapter 4 or 5 (~ -126.0 deg / -2.20 rad)
  const targetLeaf3Angle = isOpen && chapter >= 4 ? -Math.PI * 0.70 : 0;
  // Leaf 4 turns when going to chapter 5 (~ -120.6 deg / -2.10 rad)
  const targetLeaf4Angle = isOpen && chapter >= 5 ? -Math.PI * 0.67 : 0;

  // Dynamic centering math:
  // Closed: centered at 0 with iconic 3/4 showcase pose showing tactile page block thickness
  // Open: spine shifts so that left open cover and right page are symmetrically balanced
  const targetPositionX = isOpen ? 0.92 : 0;
  const baseRotationX = isOpen ? -0.08 : -0.02;
  const baseRotationY = isOpen ? -0.16 : -0.68;

  useFrame((_, delta) => {
    if (rootGroupRef.current) {
      rootGroupRef.current.position.x = THREE.MathUtils.damp(
        rootGroupRef.current.position.x,
        targetPositionX,
        5,
        delta
      );

      rootGroupRef.current.rotation.x = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.x,
        baseRotationX,
        5,
        delta
      );

      rootGroupRef.current.rotation.y = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.y,
        baseRotationY + rotationYOffset,
        6,
        delta
      );
    }

    if (frontCoverRef.current) {
      frontCoverRef.current.rotation.y = THREE.MathUtils.damp(
        frontCoverRef.current.rotation.y,
        targetCoverAngle,
        5.5,
        delta
      );
    }

    if (leaf1Ref.current) {
      leaf1Ref.current.rotation.y = THREE.MathUtils.damp(
        leaf1Ref.current.rotation.y,
        targetLeaf1Angle,
        5.5,
        delta
      );
    }

    if (leaf2Ref.current) {
      leaf2Ref.current.rotation.y = THREE.MathUtils.damp(
        leaf2Ref.current.rotation.y,
        targetLeaf2Angle,
        5.5,
        delta
      );
    }

    if (leaf3Ref.current) {
      leaf3Ref.current.rotation.y = THREE.MathUtils.damp(
        leaf3Ref.current.rotation.y,
        targetLeaf3Angle,
        5.5,
        delta
      );
    }

    if (leaf4Ref.current) {
      leaf4Ref.current.rotation.y = THREE.MathUtils.damp(
        leaf4Ref.current.rotation.y,
        targetLeaf4Angle,
        5.5,
        delta
      );
    }
  });

  return (
    <group ref={rootGroupRef} position={[0, 0, 0]}>
      {/* 1. BACK COVER SLAB (Base Structure) */}
      <mesh
        position={[0, 0, -pagesBlockThickness / 2 - coverThickness / 2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width, height, coverThickness]} />
        <meshStandardMaterial
          color="#0D1117"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Back Cover Artwork Plane */}
      {backTexture && (
        <mesh
          position={[0, 0, -pagesBlockThickness / 2 - coverThickness - 0.001]}
          rotation={[0, Math.PI, 0]}
        >
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial
            map={backTexture}
            roughness={0.25}
            metalness={0.08}
          />
        </mesh>
      )}

      {/* Back Cover Hairline Perimeter Frame (Option 2B - Matching Book Fonts) */}
      <group position={[0, 0, -pagesBlockThickness / 2 - coverThickness - 0.002]}>
        {/* Top Bevel */}
        <mesh position={[0, height / 2 - 0.006, 0]}>
          <boxGeometry args={[width, 0.012, 0.003]} />
          <meshStandardMaterial
            color={BOOK_FONT_GOLD}
            emissive={BOOK_FONT_GOLD}
            emissiveIntensity={0.45}
            roughness={0.30}
            metalness={0.75}
          />
        </mesh>
        {/* Bottom Bevel */}
        <mesh position={[0, -height / 2 + 0.006, 0]}>
          <boxGeometry args={[width, 0.012, 0.003]} />
          <meshStandardMaterial
            color={BOOK_FONT_GOLD}
            emissive={BOOK_FONT_GOLD}
            emissiveIntensity={0.45}
            roughness={0.30}
            metalness={0.75}
          />
        </mesh>
        {/* Left Bevel */}
        <mesh position={[-width / 2 + 0.006, 0, 0]}>
          <boxGeometry args={[0.012, height, 0.003]} />
          <meshStandardMaterial
            color={BOOK_FONT_GOLD}
            emissive={BOOK_FONT_GOLD}
            emissiveIntensity={0.45}
            roughness={0.30}
            metalness={0.75}
          />
        </mesh>
        {/* Right Bevel */}
        <mesh position={[width / 2 - 0.006, 0, 0]}>
          <boxGeometry args={[0.012, height, 0.003]} />
          <meshStandardMaterial
            color={BOOK_FONT_GOLD}
            emissive={BOOK_FONT_GOLD}
            emissiveIntensity={0.45}
            roughness={0.30}
            metalness={0.75}
          />
        </mesh>
      </group>

      {/* 2. PAGES BLOCK (Stacked paper sheets inside) */}
      <mesh position={[0.018, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[pagesWidth, pagesHeight, pagesBlockThickness]} />
        <meshStandardMaterial
          color="#08080A"
          roughness={0.8}
        />
      </mesh>

      {/* Paper right edge ridges */}
      <mesh
        position={[pagesWidth / 2 + 0.018, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[pagesBlockThickness, pagesHeight]} />
        <meshStandardMaterial color="#E8DEC9" roughness={0.95} />
      </mesh>

      {/* 3. SPINE (The left binding connecting the covers) */}
      <mesh position={[-width / 2 + (coverThickness * 1.3) / 2, 0, 0]} castShadow>
        <boxGeometry
          args={[coverThickness * 1.3, height, pagesBlockThickness + coverThickness * 2]}
        />
        <meshStandardMaterial
          color="#0D1117"
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>

      {/* Spine Emissive Accent Seam (Matching Book Typography) */}
      <mesh position={[-width / 2 - 0.002, 0, 0]}>
        <boxGeometry args={[0.004, height * 0.94, 0.016]} />
        <meshStandardMaterial
          color={BOOK_FONT_GOLD}
          emissive={BOOK_FONT_GOLD}
          emissiveIntensity={0.55}
        />
      </mesh>

      {/* 4. BASE RIGHT PAGE (Chapter 05 Right: Looking Ahead / Sunset Art & Bullets) */}
      <group position={[-width / 2, 0, pagesBlockThickness / 2]}>
        <mesh position={[pagesWidth / 2, 0, 0.001]}>
          <planeGeometry args={[pagesWidth, pagesHeight]} />
          <meshStandardMaterial color="#08080A" roughness={0.8} />
        </mesh>

        {page5RightTexture && (
          <mesh position={[pagesWidth / 2, 0, 0.0018]}>
            <planeGeometry args={[pagesWidth, pagesHeight]} />
            <meshStandardMaterial
              map={page5RightTexture}
              roughness={0.65}
              metalness={0.02}
            />
          </mesh>
        )}
      </group>

      {/* 5. LEAF 4: Front = Chapter 04 Right, Back = Chapter 05 Left (Shawshank Epigraph) */}
      <group
        ref={leaf4Ref}
        position={[-width / 2, 0, pagesBlockThickness / 2]}
      >
        <mesh position={[pagesWidth / 2, 0, 0.0035]}>
          <boxGeometry args={[pagesWidth, pagesHeight, 0.001]} />
          <meshStandardMaterial color="#08080A" roughness={0.8} />
        </mesh>

        {/* FRONT OF LEAF 4: Chapter 04 Right (Voyager Artwork & Story) */}
        {page4RightTexture && (
          <mesh
            position={[pagesWidth / 2, 0, 0.0042]}
            onClick={(e) => {
              e.stopPropagation();
              if (isOpen && chapter === 4) {
                onChapterChange?.(5);
              }
            }}
            onPointerOver={(e) => {
              if (isOpen && chapter === 4) {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
          >
            <planeGeometry args={[pagesWidth, pagesHeight]} />
            <meshStandardMaterial
              map={page4RightTexture}
              roughness={0.65}
              metalness={0.02}
            />
          </mesh>
        )}

        {/* BACK OF LEAF 4: Chapter 05 Left (The Shawshank Epigraph Quote) */}
        {page5LeftTexture && (
          <mesh
            position={[pagesWidth / 2, 0, 0.0028]}
            rotation={[0, Math.PI, 0]}
            onClick={(e) => {
              e.stopPropagation();
              if (isOpen && chapter === 5) {
                onChapterChange?.(4);
              }
            }}
            onPointerOver={(e) => {
              if (isOpen && chapter === 5) {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
          >
            <planeGeometry args={[pagesWidth, pagesHeight]} />
            <meshStandardMaterial
              map={page5LeftTexture}
              roughness={0.65}
              metalness={0.02}
            />
          </mesh>
        )}
      </group>

      {/* 6. LEAF 3: Front = Chapter 03 Right, Back = Chapter 04 Left */}
      <group
        ref={leaf3Ref}
        position={[-width / 2, 0, pagesBlockThickness / 2]}
      >
        <mesh position={[pagesWidth / 2, 0, 0.0065]}>
          <boxGeometry args={[pagesWidth, pagesHeight, 0.001]} />
          <meshStandardMaterial color="#08080A" roughness={0.8} />
        </mesh>

        {/* FRONT OF LEAF 3: Chapter 03 Right (SCPSC Artwork & Story) */}
        {page3RightTexture && (
          <mesh
            position={[pagesWidth / 2, 0, 0.0072]}
            onClick={(e) => {
              e.stopPropagation();
              if (isOpen && chapter === 3) {
                onChapterChange?.(4);
              }
            }}
            onPointerOver={(e) => {
              if (isOpen && chapter === 3) {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
          >
            <planeGeometry args={[pagesWidth, pagesHeight]} />
            <meshStandardMaterial
              map={page3RightTexture}
              roughness={0.65}
              metalness={0.02}
            />
          </mesh>
        )}

        {/* BACK OF LEAF 3: Chapter 04 Left (The First Spark Quote) */}
        {page4LeftTexture && (
          <mesh
            position={[pagesWidth / 2, 0, 0.0058]}
            rotation={[0, Math.PI, 0]}
            onClick={(e) => {
              e.stopPropagation();
              if (isOpen && chapter === 4) {
                onChapterChange?.(3);
              }
            }}
            onPointerOver={(e) => {
              if (isOpen && chapter === 4) {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
          >
            <planeGeometry args={[pagesWidth, pagesHeight]} />
            <meshStandardMaterial
              map={page4LeftTexture}
              roughness={0.65}
              metalness={0.02}
            />
          </mesh>
        )}
      </group>

      {/* 7. LEAF 2: Front = Chapter 02 Right, Back = Chapter 03 Left */}
      <group
        ref={leaf2Ref}
        position={[-width / 2, 0, pagesBlockThickness / 2]}
      >
        <mesh position={[pagesWidth / 2, 0, 0.0095]}>
          <boxGeometry args={[pagesWidth, pagesHeight, 0.001]} />
          <meshStandardMaterial color="#08080A" roughness={0.8} />
        </mesh>

        {/* FRONT OF LEAF 2: Chapter 02 Right (CUET Main Gate & Story) */}
        {page2RightTexture && (
          <mesh
            position={[pagesWidth / 2, 0, 0.0102]}
            onClick={(e) => {
              e.stopPropagation();
              if (isOpen && chapter === 2) {
                onChapterChange?.(3);
              }
            }}
            onPointerOver={(e) => {
              if (isOpen && chapter === 2) {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
          >
            <planeGeometry args={[pagesWidth, pagesHeight]} />
            <meshStandardMaterial
              map={page2RightTexture}
              roughness={0.65}
              metalness={0.02}
            />
          </mesh>
        )}

        {/* BACK OF LEAF 2: Chapter 03 Left (SCPSC Days Quote) */}
        {page3LeftTexture && (
          <mesh
            position={[pagesWidth / 2, 0, 0.0088]}
            rotation={[0, Math.PI, 0]}
            onClick={(e) => {
              e.stopPropagation();
              if (isOpen && chapter === 3) {
                onChapterChange?.(2);
              }
            }}
            onPointerOver={(e) => {
              if (isOpen && chapter === 3) {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
          >
            <planeGeometry args={[pagesWidth, pagesHeight]} />
            <meshStandardMaterial
              map={page3LeftTexture}
              roughness={0.65}
              metalness={0.02}
            />
          </mesh>
        )}
      </group>

      {/* 8. LEAF 1: Front = Chapter 01 Right, Back = Chapter 02 Left */}
      <group
        ref={leaf1Ref}
        position={[-width / 2, 0, pagesBlockThickness / 2]}
      >
        <mesh position={[pagesWidth / 2, 0, 0.0125]}>
          <boxGeometry args={[pagesWidth, pagesHeight, 0.001]} />
          <meshStandardMaterial color="#08080A" roughness={0.8} />
        </mesh>

        {/* FRONT OF LEAF 1: Chapter 01 Right (Workstation Artwork & Story) */}
        {page1RightTexture && (
          <mesh
            position={[pagesWidth / 2, 0, 0.0132]}
            onClick={(e) => {
              e.stopPropagation();
              if (isOpen && chapter === 1) {
                onChapterChange?.(2);
              }
            }}
            onPointerOver={(e) => {
              if (isOpen && chapter === 1) {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
          >
            <planeGeometry args={[pagesWidth, pagesHeight]} />
            <meshStandardMaterial
              map={page1RightTexture}
              roughness={0.65}
              metalness={0.02}
            />
          </mesh>
        )}

        {/* BACK OF LEAF 1: Chapter 02 Left (The CUET Paradox Quote) */}
        {page2LeftTexture && (
          <mesh
            position={[pagesWidth / 2, 0, 0.0092]}
            rotation={[0, Math.PI, 0]}
            onClick={(e) => {
              e.stopPropagation();
              if (isOpen && chapter === 2) {
                onChapterChange?.(1);
              }
            }}
            onPointerOver={(e) => {
              if (isOpen && chapter === 2) {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
          >
            <planeGeometry args={[pagesWidth, pagesHeight]} />
            <meshStandardMaterial
              map={page2LeftTexture}
              roughness={0.65}
              metalness={0.02}
            />
          </mesh>
        )}
      </group>

      {/* 8. FRONT COVER GROUP (Concentric pivot with turning leaves) */}
      <group
        ref={frontCoverRef}
        position={[-width / 2, 0, pagesBlockThickness / 2]}
      >
        {/* Main Cover Base Slab */}
        <mesh
          position={[width / 2, 0, coverThickness / 2]}
          castShadow
          receiveShadow
          onClick={(e) => {
            e.stopPropagation();
            onToggleOpen?.();
          }}
          onPointerOver={(e) => {
            if (!isOpen) {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default";
          }}
        >
          <boxGeometry args={[width, height, coverThickness]} />
          <meshStandardMaterial
            color="#0D1117"
            roughness={0.35}
            metalness={0.1}
          />
        </mesh>

        {/* FRONT COVER ARTWORK PLANE (Outside front) */}
        {frontTexture && (
          <mesh
            position={[width / 2, 0, coverThickness + 0.001]}
            onClick={(e) => {
              e.stopPropagation();
              onToggleOpen?.();
            }}
            onPointerOver={(e) => {
              if (!isOpen) {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
            }}
          >
            <planeGeometry args={[width, height]} />
            <meshStandardMaterial
              map={frontTexture}
              roughness={0.25}
              metalness={0.08}
            />
          </mesh>
        )}

        {/* FRONT COVER HAIRLINE PERIMETER FRAME (Option 2B - Dynamic Theme Bevel) */}
        <group
          position={[width / 2, 0, coverThickness + 0.002]}
          onClick={(e) => {
            e.stopPropagation();
            onToggleOpen?.();
          }}
          onPointerOver={(e) => {
            if (!isOpen) {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default";
          }}
        >
          {/* Top Bevel */}
          <mesh position={[0, height / 2 - 0.006, 0]}>
            <boxGeometry args={[width, 0.012, 0.003]} />
            <meshStandardMaterial
              color={BOOK_FONT_GOLD}
              emissive={BOOK_FONT_GOLD}
              emissiveIntensity={0.45}
              roughness={0.30}
              metalness={0.75}
            />
          </mesh>
          {/* Bottom Bevel */}
          <mesh position={[0, -height / 2 + 0.006, 0]}>
            <boxGeometry args={[width, 0.012, 0.003]} />
            <meshStandardMaterial
              color={BOOK_FONT_GOLD}
              emissive={BOOK_FONT_GOLD}
              emissiveIntensity={0.45}
              roughness={0.30}
              metalness={0.75}
            />
          </mesh>
          {/* Left Bevel (Spine Hinge Edge) */}
          <mesh position={[-width / 2 + 0.006, 0, 0]}>
            <boxGeometry args={[0.012, height, 0.003]} />
            <meshStandardMaterial
              color={BOOK_FONT_GOLD}
              emissive={BOOK_FONT_GOLD}
              emissiveIntensity={0.45}
              roughness={0.30}
              metalness={0.75}
            />
          </mesh>
          {/* Right Bevel (Opening Edge) */}
          <mesh position={[width / 2 - 0.006, 0, 0]}>
            <boxGeometry args={[0.012, height, 0.003]} />
            <meshStandardMaterial
              color={BOOK_FONT_GOLD}
              emissive={BOOK_FONT_GOLD}
              emissiveIntensity={0.45}
              roughness={0.30}
              metalness={0.75}
            />
          </mesh>
        </group>

        {/* INSIDE COVER FACE: CHAPTER 01 LEFT PAGE */}
        <group
          position={[pagesWidth / 2, 0, -0.001]}
          rotation={[0, Math.PI, 0]}
        >
          <mesh>
            <planeGeometry args={[pagesWidth, pagesHeight]} />
            <meshStandardMaterial color="#08080A" roughness={0.8} />
          </mesh>

          {page1LeftTexture && (
            <mesh
              position={[0, 0, 0.001]}
              onClick={(e) => {
                e.stopPropagation();
                if (isOpen && chapter === 1) {
                  onToggleOpen?.();
                }
              }}
              onPointerOver={(e) => {
                if (isOpen && chapter === 1) {
                  e.stopPropagation();
                  document.body.style.cursor = "pointer";
                }
              }}
              onPointerOut={() => {
                document.body.style.cursor = "default";
              }}
            >
              <planeGeometry args={[pagesWidth, pagesHeight]} />
              <meshStandardMaterial
                map={page1LeftTexture}
                roughness={0.65}
                metalness={0.02}
              />
            </mesh>
          )}
        </group>
      </group>
    </group>
  );
}
