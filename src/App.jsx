import { useState } from 'react';
import SignIn from './components/SignIn';
import AdminPanel from './components/AdminPanel';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const handleLogout = () => {
        setIsSignedIn(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <Card className="w-full max-w-4xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">Employee Management System</CardTitle>
                </CardHeader>
                <Separator className="my-4" />
                <CardContent>
                    {isSignedIn ? (
                        <AdminPanel onLogout={handleLogout} />
                    ) : (
                        <div className="flex justify-center">
                            <SignIn onSignIn={() => setIsSignedIn(true)} />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default App;