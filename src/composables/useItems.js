import {
  collection,
  getDocs,
  doc,
  query,
  where,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default function () {
  const db = getFirestore();

  const questionsRef = collection(db, "question");
  const answersRef = collection(db, "answer");

  async function allQuestions() {
    const querySnapshot = await getDocs(questionsRef);

    const questions = [];
    querySnapshot.forEach((doc) => {
      questions.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return questions;
  }

  async function getQuestion(id) {
    const docRef = doc(db, "question", id);
    const docSnap = await getDoc(docRef);

    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  }

  async function getAnswers(questionId) {
    const q = query(
      answersRef,
      where("question", "==", `/question/${questionId}`)
    );
    const querySnapshot = await getDocs(q);

    const answers = [];
    querySnapshot.forEach((doc) => {
      answers.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return answers;
  }

  async function postAnswer(email, text, questionID) {
    await setDoc(doc(db, "answer", uuidv4()), {
      author: email,
      text,
      question: `/question/${questionID}`,
    });
  }

  async function postQuestion(email, text) {
    const id = uuidv4();
    await setDoc(doc(db, "question", id), {
      author: email,
      text,
    });

    return id;
  }

  return {
    allQuestions,
    getQuestion,
    getAnswers,
    postAnswer,
    postQuestion,
  };
}
