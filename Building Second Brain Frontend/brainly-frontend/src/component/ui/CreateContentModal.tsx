import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "../Input";
import { PostContent } from "../../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "../../store/features/ModalSlice";
import type { MODAL_VALUE } from "../../store/store";
// 1. Import useMutation and useQueryClient
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function CreateContentModal() {
  const ContentType = {
    Youtube: "youtube",
    Twitter: "twitter",
    Link: "link",
  };
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  function solve(e: React.MouseEvent<HTMLDivElement>) {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      dispatch(Close());
    }
  }
  const open = useSelector((state: MODAL_VALUE) => state.Modal.ModalOpen);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [type, setType] = useState(ContentType.Youtube);
  const [tag, setTag] = useState("");
  const token = localStorage.getItem("token");

  const queryClient = useQueryClient();

  const addContentMutation = useMutation({
    mutationFn: (newContent: {
      title: string;
      link: string;
      type: string;
      tag: string;
    }) => PostContent(token as string, newContent),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["content"] });

      console.log(data);
      alert(data.message);
      dispatch(Close()); 
      setError("");
    },
    onError: (e) => {
      setError("Failed to add content. Please check the URL and try again.");
      console.log(e);
    },
  });

  async function AddNewContent() {
    const title = titleRef.current?.value || "";
    const link = linkRef.current?.value || "";

    if (title.trim() === "" || link.trim() === "") {
      setError("Title and Link cannot be empty.");
      return;
    }

    addContentMutation.mutate({
      title,
      link,
      type: type.toLowerCase(),
      tag: tag || "Not Mention",
    });

  }

  return (
    <>
      {open && (
        <div>
          {/* Your backdrop and modal structure remains the same */}
          <div
            onClick={(e) => solve(e)}
            className="w-screen h-screen bg-slate-500 opacity-60 fixed top-0 left-0 flex justify-center"
          ></div>

          <div
            onClick={(e) => solve(e)}
            className="w-screen h-screen fixed top-0 left-0 flex justify-center"
          >
            <div ref={ref} className="flex flex-col size-150 justify-center">
              <span className="bg-white opacity-100 p-4 border-slate-500 border-2 shadow-lg rounded-xl">
                <div className="flex justify-end">
                  <div
                    className="cursor-pointer"
                    onClick={() => dispatch(Close())}
                  >
                    <CrossIcon size="lg" />
                  </div>
                </div>
                {error != "" && (
                  <div className="bg-red-300 rounded text-xl text-center">
                    {error}
                  </div>
                )}
                <div className="pt-2 flex flex-col gap-2">
                  <Input placeholder={"Title"} ref={titleRef} />
                  <Input placeholder={"link"} ref={linkRef} />
                  <div className={`text-semibold`}>TYPE :</div>
                  <div className="flex gap-2">
                    <Button
                      text="Youtube"
                      size="sm"
                      variant={
                        type == ContentType.Youtube ? "secondary" : "primary"
                      }
                      onClick={() => setType(ContentType.Youtube)}
                    />
                    <Button
                      text="Twitter"
                      size="sm"
                      variant={
                        type == ContentType.Twitter ? "secondary" : "primary"
                      }
                      onClick={() => setType(ContentType.Twitter)}
                    />
                    <Button
                      text="Link"
                      size="sm"
                      variant={type == ContentType.Link ? "secondary" : "primary"}
                      onClick={() => setType(ContentType.Link)}
                    />
                  </div>
                  <Input
                    placeholder={"tag (Optional !)"}
                    onChange={(v) => setTag(v || "Not Mention")}
                  />
                </div>
                <div className="flex justify-center mt-10">
                  {/* Optional: Add loading/disabled states for a better user experience */}
                  <Button
                    variant="secondary"
                    text={addContentMutation.isPending ? "Submitting..." : "Submit"}
                    size="md"
                    onClick={AddNewContent}
                    loading={addContentMutation.isPending}
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}