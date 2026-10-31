import { useAppSelector } from "../redux/Hooks";

function Spinner() {
    // AppSlice üzerindeki loading durumunu okuyoruz:
    const { loading } = useAppSelector((state) => state.appSlice);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            {/* Dönen Dairesel Loader */}
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
        </div>
    );
}

export default Spinner;