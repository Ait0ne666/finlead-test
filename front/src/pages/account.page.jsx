import Account from "../components/Account/account"
import PageContainer from "../components/PageContainer/page-container"
import { useUser } from "../data/queries/user"

const AccountPage = () => {
    const {data: user} = useUser()


    return (
        <PageContainer>
            <div className="w-full h-full  flex justify-center items-center">
                {
                    user &&
                    <Account user={user}/>
                }

            </div>
        </PageContainer>
    )
}




export default AccountPage