interface Props {
  error: string
}

const ErrorMessage = ({ error }: Props) => {
if(error) return (

              
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm border border-red-200 text-center">
        </div>
      )
else return (<></>)
}

export default ErrorMessage