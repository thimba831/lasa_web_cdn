import Accordion from "@/app/components/Accordion";
import faqs from "@/app/data/faqs";

export default function FAQs() {
  return (
    <div className="px-6 pt-12 lg:px-8 text-black">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl m-12">FAQs</h1>
      </div>

      <div className="mx-6">
        {faqs.map((item, i) => (
          <Accordion title={item.title} key={i}>
            {item.content.split("\n").map((p, j) => (
              <p key={j} className="">
                {p}
              </p>
            ))}
          </Accordion>
        ))}
      </div>
    </div>
  );
}
