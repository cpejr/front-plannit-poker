import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getRoom,
  deleteRoom,
  addUser,
  createRoom,
  showVotes
} from "../../services/endpoints";

export function useGetRoom({
  onSuccess = () => {},
  onError = (err) => console.error(err),
  code,
} = {})  {
  return useQuery({
    queryKey: ["room", code ],
    queryFn: () => getRoom(code),
    onSuccess,
    onError,
    refetchInterval: 300,
    
  });
}

export function useDeleteRoom({
  onSuccess = () => {},
  onError = (err) => console.error(err),
} = {}) {
  return useMutation({
    mutationFn: deleteRoom,
    onSuccess,
    onError,
  });
}
export function useAddUser({
  onSuccess = () => {},
  onError = (err) => console.error(err),
} = {}) {
  return useMutation({
    mutationFn: addUser,
    onSuccess,
    onError,
  });
}

export function useShowVotes({
  onSuccess = () => {},
  onError = (err) => console.error(err),
} = {}) {
  return useMutation({
    mutationFn: showVotes,
    onSuccess,
    onError,
  });
}

export function useCreateRoom({ onSuccess = () => {} } = {}) {
    const onError = () => {};
    return useMutation({
      mutationFn: createRoom,
      onError,
      onSuccess,
    });
  }