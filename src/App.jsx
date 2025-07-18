import Factbot from "./components/Factbot";
import {
    AuthProvider,
    ConversationThreadProvider,
    ReactQueryProvider,
    ThemeProvider,
    UserProfileProvider,
} from "./context";

function App() {
    return (
        <ReactQueryProvider>
            <AuthProvider>
                <ThemeProvider>
                    <UserProfileProvider>
                        <ConversationThreadProvider>
                            <Factbot />
                        </ConversationThreadProvider>
                    </UserProfileProvider>
                </ThemeProvider>
            </AuthProvider>
        </ReactQueryProvider>
    );
}

export default App;
