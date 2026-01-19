import { Container } from "../ui/container";
import { Categories } from "./categories";

export const FeaturesFirst = () => {
    return (
        <Container>
            <div className="w-full min-h-96 pt-32 flex flex-col items-center justify-center">
                
                <Categories />
            </div>
        </Container>
    );
}