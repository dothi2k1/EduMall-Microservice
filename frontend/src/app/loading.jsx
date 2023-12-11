import './loading.css'
export default function Loading() {
  return (
    <div style={{display:'flex',flexDirection:'column',width:"100%",alignItems:'center',paddingTop:'20%'}}>
      <div class='btnMore'>
        <div class='ellipsis'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
