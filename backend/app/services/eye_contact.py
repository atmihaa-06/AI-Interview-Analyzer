import cv2
import mediapipe as mp

mp_face_detection = mp.solutions.face_detection
mp_face_mesh = mp.solutions.face_mesh


def detect_faces(video_path):

    cap = cv2.VideoCapture(video_path)

    total_frames = 0
    face_frames = 0

    with mp_face_detection.FaceDetection(
        model_selection=0,
        min_detection_confidence=0.5
    ) as face_detection:

        while cap.isOpened():

            success, frame = cap.read()

            if not success:
                break

            total_frames += 1

            rgb_frame = cv2.cvtColor(
                frame,
                cv2.COLOR_BGR2RGB
            )

            results = face_detection.process(
                rgb_frame
            )

            if results.detections:
                face_frames += 1

    cap.release()

    return {
        "total_frames": total_frames,
        "face_detected_frames": face_frames,
        "face_visibility_percent": round(
            face_frames / total_frames * 100,
            2
        ) if total_frames > 0 else 0
    }


def detect_eye_landmarks(video_path):

    cap = cv2.VideoCapture(video_path)

    frames_with_face = 0
    frames_looking_forward = 0

    with mp_face_mesh.FaceMesh(
        static_image_mode=False,
        max_num_faces=1,
        refine_landmarks=True
    ) as face_mesh:

        while cap.isOpened():

            success, frame = cap.read()

            if not success:
                break

            rgb = cv2.cvtColor(
                frame,
                cv2.COLOR_BGR2RGB
            )

            results = face_mesh.process(rgb)

            if results.multi_face_landmarks:

                frames_with_face += 1

                face_landmarks = results.multi_face_landmarks[0]

                nose_x = face_landmarks.landmark[1].x

                left_eye_x = face_landmarks.landmark[33].x

                right_eye_x = face_landmarks.landmark[263].x

                eye_center = (
                    left_eye_x +
                    right_eye_x
                ) / 2

                difference = abs(
                    nose_x - eye_center
                )

                if difference < 0.03:
                    frames_looking_forward += 1

    cap.release()

    eye_contact_percent = 0

    if frames_with_face > 0:
        eye_contact_percent = (
            frames_looking_forward /
            frames_with_face
        ) * 100

    return {
        "frames_with_face": frames_with_face,
        "frames_looking_forward": frames_looking_forward,
        "eye_contact_percent": round(
            eye_contact_percent,
            2
        )
    }