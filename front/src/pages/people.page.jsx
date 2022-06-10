import { Spinner } from "@chakra-ui/react"
import PageContainer from "../components/PageContainer/page-container"
import PeopleList from "../components/PeopleList/people-list"
import { usePeople } from "../data/queries/people"

const PeoplePage = () => {

    const { data: people, isError, isLoading, error } = usePeople()
    const loading = !people && !isError && isLoading


    return (
        <div className="w-full h-screen min-h-screen ">
            {
                loading ?
                    <div className="w-full h-full flex justify-center items-center">
                        <Spinner />
                    </div>
                    :

                    isError ?
                        <div className="w-full h-full flex justify-center items-center"> {error.message}</div>
                        :
                        <PeopleList people={people} />
            }
        </div>

    )
}




export default PeoplePage