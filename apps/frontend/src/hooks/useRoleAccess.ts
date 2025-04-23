
import { useRouter } from "next/navigation";
import { roleBasedRoutes } from "@/utils/roleBasedRoutes"
import { useAppSelector } from "@/lib/hooks";

const useRoleAccess = () => {
  const router = useRouter();
  const role = useAppSelector((state) => state.user.role) as keyof typeof roleBasedRoutes;
  const token = useAppSelector((state) => state.session.token);

  const checkAccess = (path: string) => {
    if (!token) {
      router.push("/login");
      return false;
    }

    if (role && roleBasedRoutes?.[role]?.includes(path)) {
      return true;
    } else {
      router.push("/unauthorized");
      return false;
    }
  };

  return { checkAccess };
};

export default useRoleAccess;
