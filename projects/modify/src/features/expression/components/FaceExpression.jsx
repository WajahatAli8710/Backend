import React, { useEffect, useRef, useState } from "react";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  const [expression, setExpression] = useState("No Expression Detected");

  const getExpression = (blendshapes) => {
    const score = (name) =>
      blendshapes.find((b) => b.categoryName === name)?.score || 0;

    const smile = (score("mouthSmileLeft") + score("mouthSmileRight")) / 2;

    const frown = (score("mouthFrownLeft") + score("mouthFrownRight")) / 2;

    const surprise = score("jawOpen") + score("browInnerUp");

    if (smile > 0.5) return "😊 Happy";
    if (surprise > 1.0) return "😲 Surprised";
    if (frown > 0.0009) return "😢 Sad";

    return "😐 Neutral";
  };

  const init = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
      );

      const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
        },
        runningMode: "VIDEO",
        numFaces: 1,
        outputFaceBlendshapes: true,
      });

      faceLandmarkerRef.current = faceLandmarker;
    } catch (error) {
      console.error(error);
    }
  };

  const detect = () => {
    if (!videoRef.current || !faceLandmarkerRef.current) {
      return;
    }

    const results = faceLandmarkerRef.current.detectForVideo(
      videoRef.current,
      performance.now(),
    );

    if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
      const detectedExpression = getExpression(
        results.faceBlendshapes[0].categories,
      );

      setExpression(detectedExpression);
    } else {
      setExpression("No Face Detected");
    }
  };

  useEffect(() => {
    init();

    return () => {
      if (faceLandmarkerRef.current) {
        faceLandmarkerRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width={640}
        height={480}
      />

      <h2>{expression}</h2>

      <button onClick={detect}>Detect Expression</button>
    </div>
  );
}
