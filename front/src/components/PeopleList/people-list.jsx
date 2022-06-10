import Card from "../Card/card"
import PageContainer from "../PageContainer/page-container"

const PeopleList = ({people}) => {




    return (
        <PageContainer>
            <div className="w-full grid grid-cols-3 gap-4">
                {
                    people.map((user) => {
                        return <Card key={user.id} {...user} />
                    })
                }
                
            </div>  
        </PageContainer>
    )
}




export default PeopleList