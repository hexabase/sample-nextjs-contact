import { authServiceApi } from '@/services/auth-service';
import { useMutation } from '@tanstack/react-query';

const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: authServiceApi.login,
  });

  return { loginMutation };
};

export default useAuth;
