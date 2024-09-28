import CardWrapper from './CardWrapper'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

const ErrorCard = () => {
  return (
    <CardWrapper
        headerLabel='Something went wrong'
        backButtonHref='/auth/login'
        backButtonLabel='Go back to login'
    >
        <div className="w-full flex justify-center items-center">
            <ExclamationTriangleIcon className='text-destructive'/>
        </div>
    </CardWrapper>

  )
}

export default ErrorCard