
const ErrorMessage = ({ error }) => {
if(error !='') return (

              
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm border border-red-200 text-center">
          {error}
        </div>
      )
else return (<></>)
}

export default ErrorMessage