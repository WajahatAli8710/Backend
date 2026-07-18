import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

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

export const init = async ({
  videoRef,

  faceLandmarkerRef,
}) => {
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

export const detect = ({ videoRef, faceLandmarkerRef, setExpression }) => {
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
