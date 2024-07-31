"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";

const UploadDoc = () => {
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [updatedQuiz, setUpdatedQuiz] = useState({});
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [findIndexQuiz, setFindIndexQuiz] = useState(null);
  const [id, setId] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!document) {
      setError("Please upload the document first");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("pdf", document);
    try {
      const res = await fetch("/api/quizzes/generate", {
        method: "POST",
        body: formData,
      });
      if (res.status === 200) {
        const data = await res.json();
        setUpdatedQuiz(data.result.quiz);
       
        const { quizTitle, icon, quizQuestions,id } = data.result.quiz
  console.log("your data is ",quizQuestions,quizTitle,icon,id)// Pass id to saveQuiz
        saveQuiz(data.result.quiz);
        router.push("/");
        revalidatePath("/");
      }
    
    } catch (e) {
      console.log("error while generating", e);
    }
    setIsLoading(false);
  };

  async function saveQuiz(data) {
    try {
      const res = await fetch('http://localhost:3000/api/quizzes/parsequiz', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data || updatedQuiz),
      });

      if (!res.ok) {
        throw new Error('Failed to update quiz');
      }

      toast.success('The quiz has been saved successfully.');
      setAllQuizzes(updatedQuiz);
    } catch (error) {
      toast.error(error.message);
    } finally {
      // createNewQuiz();
      router.push('/'); // Navigate to main page
    }
  }

  const handleDocumentUpload = (e) => {
    setDocument(e?.target?.files?.[0]);
    if (error) {
      setError("");
    }
  };
 

  return (
    <div className="w-3/5 text-xl">
      {isLoading ? <p>Loading...</p> : <form className="w-full flex flex-col gap-10" onSubmit={handleSubmit}>
        <label htmlFor="document" className="bg-secondary w-full flex h-20 rounded-md border-4 border-dashed border-blue-900 relative">
          <div className="absolute inset-0 m-auto flex justify-center items-center">
            {document && document?.name ? document.name : "Drag a file"}</div>
          <input type="file" id="document" className="relative block w-full h-full z-50 opacity-0" onChange={handleDocumentUpload} />
        </label>
        <p className="text-secondary-foreground my-2 text-center">Supported file types: pdf</p>
        {error ? <p className="text-red-600">{error}</p> : null}
        <button  className="mt-2 bg-theme p-4 rounded-lg text-white text-2xl font-semibold " type="submit">Generate Quizz 🪄</button>
      </form>}
    </div>
  )
}

export default UploadDoc;