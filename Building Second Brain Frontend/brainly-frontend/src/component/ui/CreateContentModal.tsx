import { useRef, useState } from "react";
import { Button } from "./Button";
import { Input } from "../Input";
import { PostContent } from "../../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "../../store/features/ModalSlice";
import type { MODAL_VALUE } from "../../store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, AlertCircle, CheckCircle, Youtube, Twitter, Link2 } from "lucide-react";

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
  const [success, setSuccess] = useState("");
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
      setSuccess(data.message);
      
      setTimeout(() => {
        dispatch(Close());
        setError("");
        setSuccess("");
        titleRef.current!.value = "";
        linkRef.current!.value = "";
        setTag("");
        setType(ContentType.Youtube);
      }, 1500);
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

  const contentTypeOptions = [
    { key: ContentType.Youtube, label: "YouTube", icon: <Youtube size={18} /> },
    { key: ContentType.Twitter, label: "Twitter", icon: <Twitter size={18} /> },
    { key: ContentType.Link, label: "Link", icon: <Link2 size={18} /> },
  ];

  return (
    <>
      {open && (
        <div>
          <div
            onClick={(e) => solve(e)}
            className="fixed inset-0 bg-transparent opacity-50 z-40 transition-opacity duration-300"
          />

          <div
            onClick={(e) => solve(e)}
            className="fixed inset-0 flex justify-center items-center z-50 p-4"
          >
            <div 
              ref={ref} 
              className="bg-gray-100 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-300"
            >
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white">Add Content</h2>
                  <p className="text-purple-100 text-sm mt-1">Save your important notes and resources</p>
                </div>
                <button
                  onClick={() => dispatch(Close())}
                  className="p-2 hover:bg-purple-500 rounded-lg transition text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="p-8 space-y-6">
                  
                  {error && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-xl animate-in fade-in slide-in-from-top">
                      <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm">Error</p>
                        <p className="text-sm mt-0.5">{error}</p>
                      </div>
                    </div>
                  )}

                  {success && (
                    <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-xl animate-in fade-in slide-in-from-top">
                      <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm">Success!</p>
                        <p className="text-sm mt-0.5">{success}</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 block">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        placeholder="Give your content a memorable title..." 
                        ref={titleRef}
                        disabled={addContentMutation.isPending}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 block">
                        URL <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        placeholder="https://example.com" 
                        ref={linkRef}
                        disabled={addContentMutation.isPending}
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-700 block">
                        Content Type <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {contentTypeOptions.map((option) => (
                          <button
                            key={option.key}
                            onClick={() => setType(option.key)}
                            disabled={addContentMutation.isPending}
                            className={`group py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                              type === option.key
                                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {option.icon}
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 block">
                        Tag <span className="text-gray-400">(Optional)</span>
                      </label>
                      <Input
                        placeholder="e.g., Learning, Important, Reference..."
                        onChange={(v) => setTag(v || "Not Mention")}
                        disabled={addContentMutation.isPending}
                      />
                    </div>
                  </div>

                  {/* Helper Text */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700">
                      <span className="font-semibold">💡 Tip:</span> Add clear titles and relevant tags to make your content easy to find later.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 bg-gray-50 px-8 py-4 flex gap-3">
                <button
                  onClick={() => dispatch(Close())}
                  className="flex-1 py-2.5 px-4 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition duration-200"
                  disabled={addContentMutation.isPending}
                >
                  Cancel
                </button>
                <Button
                  variant="primary"
                  text={addContentMutation.isPending ? "Adding..." : "Add Content"}
                  size="md"
                  fullwidth={true}
                  onClick={AddNewContent}
                  loading={addContentMutation.isPending}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}