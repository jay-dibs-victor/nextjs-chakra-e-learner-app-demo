import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Text,
    useToast,
    HStack,
    Divider,
    Icon,
} from '@chakra-ui/react';
import { useAuth } from 'core/libs/context/AuthContext';
import { HiMail, HiLockClosed, HiUser } from 'react-icons/hi';

const AuthModal = ({ isOpen, onClose }) => {
    const [mode, setMode] = useState('login'); // login, signup, otp
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        otp: ''
    });
    const [loading, setLoading] = useState(false);
    const { login, signup, verifyOtp } = useAuth();
    const toast = useToast();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (mode === 'login') {
                await login(formData.email, formData.password);
                toast({ title: 'Success', status: 'success' });
                onClose();
            } else if (mode === 'signup') {
                const res = await signup(formData);
                if (res.data.autoVerified) {
                    toast({ title: 'Account created and verified!', status: 'success' });
                    onClose();
                } else {
                    toast({ title: 'OTP sent to your email', status: 'info' });
                    setMode('otp');
                }
            } else if (mode === 'otp') {
                await verifyOtp(formData.email, formData.otp);
                toast({ title: 'Email verified!', status: 'success' });
                onClose();
            }
        } catch (err) {
            toast({ title: 'Error', description: err.response?.data?.message || 'Something went wrong', status: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent rounded="3xl" p={4}>
                <ModalHeader fontWeight="black" fontSize="2xl">
                    {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Join our Learning Community' : 'Verify Email'}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        {mode === 'signup' && (
                            <HStack w="full">
                                <FormControl>
                                    <FormLabel>First Name</FormLabel>
                                    <Input name="firstName" placeholder="John" rounded="xl" onChange={handleChange} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input name="lastName" placeholder="Doe" rounded="xl" onChange={handleChange} />
                                </FormControl>
                            </HStack>
                        )}
                        <FormControl>
                            <FormLabel>Email Address</FormLabel>
                            <Input name="email" type="email" placeholder="john@example.com" rounded="xl" onChange={handleChange} />
                        </FormControl>
                        {mode !== 'otp' && (
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input name="password" type="password" placeholder="••••••••" rounded="xl" onChange={handleChange} />
                            </FormControl>
                        )}
                        {mode === 'otp' && (
                            <FormControl>
                                <FormLabel>Enter 6-digit OTP</FormLabel>
                                <Input name="otp" placeholder="123456" rounded="xl" fontSize="2xl" textAlign="center" letterSpacing="10px" onChange={handleChange} />
                            </FormControl>
                        )}

                        <Button 
                            colorScheme="blue" 
                            w="full" 
                            size="lg" 
                            rounded="2xl" 
                            h="60px" 
                            fontWeight="black" 
                            onClick={handleSubmit}
                            isLoading={loading}
                        >
                            {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Verify & Continue'}
                        </Button>

                        <Divider />

                        <Text fontSize="sm" color="gray.500">
                            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                            <Button 
                                variant="link" 
                                colorScheme="blue" 
                                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                            >
                                {mode === 'login' ? 'Sign Up' : 'Login'}
                            </Button>
                        </Text>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AuthModal;
