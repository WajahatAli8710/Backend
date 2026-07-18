import { useEffect, useRef, useState } from "react";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";
import { init, detect } from "../utils/utils";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  const [expression, setExpression] = useState("No Expression Detected");

  useEffect(() => {
    init({videoRef, faceLandmarkerRef});

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

      <button
        onClick={() => {
          detect({videoRef, faceLandmarkerRef, setExpression});
        }}
      >
        Detect Expression
      </button>
    </div>
  );
}
