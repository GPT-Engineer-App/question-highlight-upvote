import React, { useState } from "react";
import { Box, Heading, Stack, Text, Button, Container, VStack, HStack, IconButton, useToast } from "@chakra-ui/react";
import { FaThumbsUp, FaRegThumbsUp, FaArrowLeft } from "react-icons/fa";

// Mock data for questions
const questionsData = [
  { id: 1, title: "What is React?", content: "Can someone explain what React is all about?", upvotes: 5 },
  { id: 2, title: "Why use Chakra UI?", content: "What are the benefits of using Chakra UI?", upvotes: 3 },
  { id: 3, title: "How to learn React?", content: "What are the best resources to learn React?", upvotes: 4 },
];

const Index = () => {
  const [questions, setQuestions] = useState(questionsData);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [upvotedQuestions, setUpvotedQuestions] = useState([]);
  const toast = useToast();

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  const handleUpvote = (questionId) => {
    if (upvotedQuestions.includes(questionId)) {
      // Undo upvote
      setQuestions(questions.map((q) => (q.id === questionId ? { ...q, upvotes: q.upvotes - 1 } : q)));
      setUpvotedQuestions(upvotedQuestions.filter((id) => id !== questionId));
    } else {
      // Upvote
      setQuestions(questions.map((q) => (q.id === questionId ? { ...q, upvotes: q.upvotes + 1 } : q)));
      setUpvotedQuestions([...upvotedQuestions, questionId]);
    }
  };

  const handleAnswer = () => {
    toast({
      title: "Answering is not implemented in this demo.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" py={5}>
      {selectedQuestion ? (
        <VStack spacing={4} align="stretch">
          <Button leftIcon={<FaArrowLeft />} onClick={() => setSelectedQuestion(null)} variant="ghost">
            Back to questions
          </Button>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Heading size="lg">{selectedQuestion.title}</Heading>
            <Text mt={4}>{selectedQuestion.content}</Text>
            <HStack mt={4}>
              <IconButton aria-label="Upvote" icon={upvotedQuestions.includes(selectedQuestion.id) ? <FaThumbsUp /> : <FaRegThumbsUp />} onClick={() => handleUpvote(selectedQuestion.id)} />
              <Text>{questions.find((q) => q.id === selectedQuestion.id).upvotes}</Text>
              <Button colorScheme="blue" onClick={handleAnswer}>
                Answer
              </Button>
            </HStack>
          </Box>
        </VStack>
      ) : (
        <VStack spacing={4} align="stretch">
          {questions.map((question) => (
            <Box key={question.id} p={5} shadow="md" borderWidth="1px" borderRadius="md" _hover={{ bg: "gray.100", cursor: "pointer" }} onClick={() => handleQuestionClick(question)}>
              <Heading size="md">{question.title}</Heading>
              <Text mt={2}>{question.content}</Text>
              <Text mt={2} color="gray.500">
                Upvotes: {question.upvotes}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Container>
  );
};

export default Index;
