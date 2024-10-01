import { TopicForm } from "./TopicForm"
import { TopicsList } from "./TopicsList"

export const TopicListPage = () => {

    return (
        <div> 
            <div className="flex items-center justify-center w-full p-5 bg-red-500">
        <TopicsList />
     
      </div>
        <TopicsList/>
        <TopicForm/>
        </div>
    )
}