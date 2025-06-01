import React from "react";
// TODO : Fix this
// import { Button } from "@/components/ui/button";

interface CallToActionProps {
  onStartCreating: () => void;
}

export const CallToAction = ({ onStartCreating }: CallToActionProps) => {
  return (
    <div className="text-center mt-20">
      <h2 className="text-4xl font-bold text-white mb-4">
        Ready to awaken your creativity?
      </h2>
      <p className="text-xl text-gray-300 mb-8">
        Join thousands of artists creating amazing manhwa and comics
      </p>
      <Button
        onClick={onStartCreating}
        className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Start Creating Now
      </Button>
    </div>
  );
};
