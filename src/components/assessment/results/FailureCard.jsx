import React from "react";
import Typography from "../../ui/Typography";
import Button from "../../ui/Button";
import Card from "../../ui/Card";

export default function FailureCard({
  outcome,
  onReset,
  showHelp,
  setShowHelp,
}) {
  return (
    <Card className="p-8 border-none shadow-xl bg-white">
      <div className="flex items-start gap-3">
        <span className="material-icons-outlined text-red-500 text-2xl">
          error_outline
        </span>
        <div>
          <Typography variant="h3" className="font-bold text-2xl mb-2">
            Assessment failed
          </Typography>
          <Typography variant="body1" color="textSecondary">
            We weren’t able to complete your assessment. Please try again in a
            moment.
          </Typography>
          {outcome?.error?.message ? (
            <p className="mt-3 text-xs text-gray-500">
              Details: {outcome.error.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button onClick={onReset} className="flex-1 py-4 shadow-xl">
          Try again
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowHelp((s) => !s)}
          className="flex-1 py-4 font-bold border-2"
        >
          What happened?
        </Button>
      </div>

      {showHelp ? (
        <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100 text-left">
          <p className="text-xs text-gray-600 leading-relaxed">
            Looks like something didn't go through on our end. Give it another
            try shortly—we're working behind the scenes.
          </p>
        </div>
      ) : null}
    </Card>
  );
}
