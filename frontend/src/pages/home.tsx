import homeBackground from "../assets/background/home.png"
import { useBrain } from "../context/brainContext";
import ChatBar from "../components/chatBar";



export const Home = () => {

    const { selectedBrain } = useBrain();
    const brainId = selectedBrain === "personal"
        ? null
        : selectedBrain;

    return (
        <div
            style={{
                backgroundImage: `url(${homeBackground})`,
                backgroundSize: "115%",
            }}
            className="min-h-screen flex flex-col w-full relative bg-no-repeat bg-cover bg-center"
        >
            {/* Text */}
            <div className="absolute left-[40px] top-[20px]">
                <h1 className="font-nour text-[45px] text-[#0033CC]">
                    olter
                </h1>

                <span className="font-helvetica text-[#17191C] text-[28px]">
                    a gateway to connected knowledge
                </span>

                <p className="font-noto text-[#687589]">
                    olter turns everything you read, watch, learn, and write into a
                    knowledge base you can <br />
                    actually talk to. Ask it to connect ideas, explain concepts,
                    summarize or quiz you. <br />
                    And you dont have to build it alone. Share you brain, collaborate
                    with others and build a <br />
                    knowledge base together.
                </p>
            </div>

            {/* Chat bar */}
            <div
                className="
                absolute
                left-1/2
                -translate-x-1/2
                top-[480px]
            "
            >
                <ChatBar
                    brainId={brainId}
                />
            </div>
            <div
                className="absolute bottom-[50px] left-[40px]
                text-[#0033CC] text-[43px] leading-[1.1]
                ">
                <h1
                    className="font-nour"
                >
                    your <br />
                    knowledge. <br />
                    your Context. <br />
                    one <br />
                    coversation.
                </h1>
            </div>
        </div>
    )
}