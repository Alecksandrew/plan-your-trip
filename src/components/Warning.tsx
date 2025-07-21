type Warning = {
  errorMessage: string;
onClick: (value: string | null) => void;
};

export default function Warning({ errorMessage, onClick }: Warning) {

    function handleButtonClick() {
        onClick(null)
    }

    return (
    <>
        <div className="bg-paleta-01 fixed -translate-1/2 left-1/2 top-1/2 h-1/2 max-h-100 w-4/5 max-w-150 text-center rounded p-6 flex align-center justify-center flex-col shadow-2xl outline-4 outline-paleta-03 -outline-offset-10 z-3">
          <div className="mb-6">
              <h2 className="mb-4 text-paleta-04">
                Algo deu errado <br />
                (•︵•)
              </h2>
              <p className="text-paleta-03">
                {errorMessage}
              </p>
          </div>
        <button type="button" onClick={handleButtonClick}  className="rounded bg-paleta-03 w-fit mx-auto p-2 font-bold" >Ok, entendi!</button>
        </div>

        <div className="fixed w-full h-screen bg-paleta-04 z-2 opacity-80"></div>
    </>
  );
}
