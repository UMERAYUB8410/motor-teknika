export default function MaskingTechDemo() {
  return (
    <div className="h-full w-full overflow-hidden bg-[#07090e]" aria-label="Interactive MaskingTech demo">
      <iframe
        src="/masking-tech-demo.html"
        title="Interactive MaskingTech before and after demo"
        loading="lazy"
        className="h-[440px] w-[200%] origin-top-left scale-50 border-0"
      />
    </div>
  );
}
