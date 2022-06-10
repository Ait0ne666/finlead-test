import {useCallback} from "react";
import {useToast} from "@chakra-ui/react";








export const useCustomToast = () => {
    const toast = useToast()

    const showToast = useCallback((message, status, title) => {
      toast({
          title: title ? title : "Ошибка",
          description: message,
          position: "top-right",
          status: status ? status : "error",
          duration: 8000,
          isClosable: true,
  
      });
    },[toast])


    return showToast
}