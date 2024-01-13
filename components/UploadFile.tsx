"use client";
import { useRef, useState } from "react";
export const UploadFile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!inputFileRef.current?.files?.length) {
      alert("Пожалуйста добавьте файлы для загрузки");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    Object.values(inputFileRef.current.files).forEach((file) => {
      formData.append("file", file);
    });

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const body = (await response.json()) as {
      status: "ok" | "fail";
      message: string;
    };

    alert(body.message);

    if (body.status === "ok") {
      inputFileRef.current.value = "";
    } else {
      console.log("error", body.status);
    }

    setIsLoading(false);
  };

  return (
    <form>
      <div>
        <input type="file" name="myfile" ref={inputFileRef} multiple />
      </div>
      <div>
        <input
          type="submit"
          value="Upload"
          disabled={isLoading}
          onClick={onSubmit}
        />
        {isLoading && "Загрузка"}
      </div>
    </form>
  );
};
