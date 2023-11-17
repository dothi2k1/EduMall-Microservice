import swal from "sweetalert";
import { useRouter } from "next/navigation";

const TotalScore = ({ score }) => {
  const router = useRouter();
  if (score > 10 ) {
    swal("Congratulations", "Bạn được 1 voucher 200k !! Hãy tham gia các trò chơi còn lại để nhận thêm ưu đãi", "success")
    router.push("/minigame/wheel2")
  }
  return (
    <div className="ml-5 lg:ml-[200px]">
      <div className="max-w-[200px] items-center">
        <h1 className="text-[100px] leading-[100px]">{score}</h1>
        <p className="text-[24px] font-[500px]">Total Score</p>
      </div>
        <p><i>When you get score greater then 10 point,</i></p>
        <p><i>you will be receive a Voucher !!</i></p>
    </div>
  );
};

export default TotalScore;
