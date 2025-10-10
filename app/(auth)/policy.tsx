import ViewThemed from "../../components/ui/ViewThemed";
import ConfidentialPolicy from "../../components/auth/ConfidentialPolicy";
import {globalStyles} from "../../style/Global";

const Policy = () => {
    return (
        <ViewThemed safe={true} style={globalStyles.container}>
            <ConfidentialPolicy />
        </ViewThemed>
    );
};

export default Policy;