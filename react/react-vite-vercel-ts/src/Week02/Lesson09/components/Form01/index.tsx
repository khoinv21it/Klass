import FormSignup from "./FormSignup";
import FormLogin from "./FormLogin";

type Props = {};

export default function Form01({}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-[url(/images/Lesson09/bg_form1.jpg)] w-[350px] h-auto bg-cover bg-center rounded-2xl shadow-xl p-6 flex flex-col gap-4 backdrop-blur-sm bg-white/70">
        <p className="text-2xl text-amber-100 font-bold">Sign Up</p>
        <FormSignup />
      </div>

      <div className="bg-[url(/images/Lesson09/bg_form1.jpg)] w-[350px] h-auto bg-cover bg-center rounded-2xl shadow-xl p-6 flex flex-col gap-4 backdrop-blur-sm bg-white/70">
        <p className="text-2xl text-amber-100 font-bold">Login</p>
        <FormLogin />
      </div>
    </div>
  );
}
