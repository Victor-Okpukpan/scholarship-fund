import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";

export default function FinalSection() {
  const navigate = useNavigate();
  return (
    <div className="pt-20">
      <section className="bg-[#FBE7D5] py-20">
        <div className="mx-auto max-w-[1100px] text-center px-3">
          <p className="text-3xl text-center font-medium mb-10">
            Providing Equal Opportunities and Accessibility to Education
          </p>
          <Button
            onClick={() => {
              navigate("/apply");
            }}
            className="hover:bg-transparent hover:text-orange-500 border-2 bg-[#FF7900] border-[#FF7900] text-white"
          >
            Apply Now!
          </Button>
        </div>
      </section>
    </div>
  );
}
