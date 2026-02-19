import Button from "../../ui/Button";

export default function ResultsActions({ onReset, data }) {
  const reportUrl = data?.report_url;

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-2">
      <Button
        onClick={() => {
          if (reportUrl) window.open(reportUrl, "_blank");
          else
            alert(
              "PDF not available yet. Backend needs to provide report_url or assessment_id.",
            );
        }}
        className="flex-1 py-4 shadow-xl group"
      >
        <span>Download PDF Summary</span>
        <span className="material-icons-outlined ml-2 group-hover:translate-y-1 transition-transform">
          download
        </span>
      </Button>

      <Button
        variant="outline"
        onClick={onReset}
        className="flex-1 py-4 font-bold border-2"
      >
        Re-run Assessment
      </Button>
    </div>
  );
}
