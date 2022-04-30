import React , { useState} from "react"
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  Center,

} from "@chakra-ui/react";

// import {
//   ThemeProvider,
//   CSSReset,
//   Box,
//   Heading,
//   PseudoBox
// } from "@chakra-ui/core";

import { Image } from "components/shared/blocks/Image";
import Layout, { Container } from "components/shared/blocks/Layout";
import { Link } from "components/shared/blocks/Link";
import dateFormat from "dateformat";
import { TiMediaPlay, TiSocialFacebook, TiSocialTwitter } from "react-icons/ti";
import { GoThreeBars } from "react-icons/go";

import { Swiper, SwiperSlide } from "swiper/react";
// // import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import breakpoints  from "core/theme/breakpoints";

export const Section = ({ children, ...rest }) => {
  return (
    <Box
      as="section"
      px={{ base: 2, sm2: 6 }}
      maxW={breakpoints.xl}
      mx="auto"
      {...rest}
    >
      {children}
    </Box>
  );
};

const CustomerReview = ({contentText}) => {
  const [isVisible, setIsVisible] = useState(false);

  function over(e) {
    setIsVisible(true);
  }
  function out(e) {
    setIsVisible(false);
  }
  
  return (

 


  <Box
    flexShrink="0"
    shadow="md"
    rounded="md"
    p={4}
    my={4}
    bg="brand.white"
    mx={4}
    w={{ base: "300px", md: "350px" }}
    boxShadow="-50px 50px 25px rgba(0, 0, 0, .03)"

    
  color="blue.700"
  fontWeight="semibold"
  py={2}
  px={4}
  borderWidth="1px"
  borderColor="blue.500"
  rounded="md"
  _hover={{ bg: "blue.500", color: " white" }}
  _focus={{ boxShadow: "outline" }}
  onMouseOver={over}
  onMouseOut={out}
  >
    <Text lineHeight="25px" >
      {contentText}
    </Text>

    <Flex
      mt={3}
      textAlign={{ base: "left", md: "right" }}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      alignItems="flex-end"
    >
      <Box color="brand.secondary">
        <Text m={0} type="nm-bold">
          Jame. S. Samuel
        </Text>

        <Text m={0}>Lesa Restaurant</Text>
      </Box>

      <Image
        src="/images/lg/customer-satisfaction.jpeg"
        border="1px"
        rounded="full"
        ml={2}
        w="65px"
        h="65px"
      />
    </Flex>
  </Box>


)
  }

// A function that renders the content for `Kitchen` tab
const renderTabKitchenAppliancesContent = (
  <Flex
    flexDir={{ base: "column", md: "row" }}
    justifyContent="center"
    alignItems={{ base: "center", md: "stretch" }}
  >
    {/* Big Card */}
    <Flex
      flexDir="column"
      alignItems="center"
      textAlign="center"
      p={5}
      w={{ base: "300px", md: "400px" }}
      rounded="xl"
      bg="brand.white"
      border="1px"
      borderColor="brand.gray5"
      mr={{ md: 10 }}
      mb={{ base: 5, md: 0 }}
    >
      <Image
        mt="auto"
        w={{ base: "200px", md: "300px" }}
        h={{ base: "150px", md: "250px" }}
        mb={{ base: 4, md: 10 }}
        isProduct
        src="/images/lg/product 3.png"
      />

      <Heading w={{ base: "180px", md: "300px" }}>
        AddWash™, 10kg, Washer Dryer, 4 Ticks
      </Heading>

      <Text mb="auto" type="sm-regular" lineHeight="20px">
        Simply add during wash with AddWash door Wash & dry in 59 minute
      </Text>

      
    </Flex>

    {/* Small Cards */}
    <Flex flexDir="column" w="300px" rounded="lg">
      <Box
        d="grid"
        placeItems="center"
        textAlign="center"
        p={5}
        w="300px"
        h={{ base: "200px", md: "255px" }}
        flex="1"
        rounded="lg"
        bg="brand.white"
        border="1px"
        borderColor="brand.gray5"
        mb={{ base: 5, md: 10 }}
      >
        <Image
          w={{ base: "200px", md: "120px" }}
          h={{ base: "150px", md: "100px" }}
          isProduct
          mb={4}
          src="/images/lg/product 2.png"
        />

        <Heading w="180px">AddWash™, 10kg, Washer Dryer, 4 Ticks</Heading>

        {/* <Text type="sm-regular" lineHeight="20px">
          Simply add during wash with AddWash door Wash & dry in 59 minute
        </Text> */}

        
      </Box>
      <Box
        d="grid"
        placeItems="center"
        textAlign="center"
        p={5}
        w="300px"
        h={{ base: "200px", md: "255px" }}
        flex="1"
        rounded="lg"
        bg="brand.white"
        border="1px"
        borderColor="brand.gray5"
      >
        <Image
          w={{ base: "200px", md: "120px" }}
          h={{ base: "150px", md: "100px" }}
          isProduct
          mb={4}
          src="/images/lg/product 1.png"
        />

        <Heading w="180px">AddWash™, 10kg, Washer Dryer, 4 Ticks</Heading>

        {/* <Text type="sm-regular" lineHeight="20px">
          Simply add during wash with AddWash door Wash & dry in 59 minute
        </Text> */}

       
      </Box>
    </Flex>
  </Flex>
);

// The `Special Products`'s Tab data
const specialProductsTabData = [
  { header: "TV's", content: "TV's content" },
  {
    header: "Kitchen Appliances",
    content: renderTabKitchenAppliancesContent,
  },
  { header: "IT", content: "IT content" },
  { header: "Other Offers", content: "Other Offers content" },
];

const HomePage = () => {
  return (
    <Layout>
        


     

     

       


      

          {/* Hero */}
      <Section
        maxW={breakpoints.xxl}
        bg="brand.primaryLight"
        px={6}
        py={{ base: 10, lg: 20 }}
      >
        <Flex justifyContent="center">
          <Flex alignItems="" mr={{ lg: 16 }}>
            <Box pt={6} pb={{ lg: "45px" }}>
              <Box maxW="500px">
                <Heading type="h1" as="h1" color="brand.secondary">
                Education ,Online learning ever evolving capacity and easy carreer pathfinder.
                  
                </Heading>

                <Text type="lg-regular" mb={{ base: 10, md: "30px" }}>
                 For remote jobs, office jobs and organizations tackling
                 unemployment by empowering entrepreneurs or supporting job seekers 
                 and vetting reputable employees, we have got you covered on our platform.
                </Text>
              </Box>
              <Link mute href="/signup">
                <Button variant="primary">Create an Account</Button>
              </Link>

           
            </Box>
          </Flex>

          <Flex
            flexShrink={0}
            alignSelf="center"
            d={{ base: "none", lg: "flex" }}
            w={{ lg: "550px", xl: "600px" }}
            h={{ lg: "350px", xl: "400px" }}
            pos="relative"
          >
            <Image
              pos="absolute"
              w="100%"
              h="300px"
              src="/img/herolanding.jpg"
             boxShadow="-50px 50px 25px rgba(0, 0, 0, .08)"
            />
          </Flex>
        </Flex>
      </Section>








      <Section
        maxW={breakpoints.xxl}
        bg="brand.primaryLight"
     
      
      >
        <Flex justifyContent="center">
          <Flex alignItems=""  bg="#691b37">
            <Box p="40px"  pb={{ lg: "45px" }} color="#fff">
              <Box >
                <Heading type="h1" as="h1" color="#fff">
                Growth Programmes.
                  
                </Heading>

                <Text type="lg-regular" mb={{ base: 10, md: "30px" }}>
                For entities looking to design effective programs and activities 
                (which can be delivered on-site or remotely) to empower entrepreneurs 
                with relevant business skills,
                 networking opportunities and tailored support on their entrepreneurial journey.
                </Text>
              </Box>
              <Link mute href="/signup">
                <Button variant="primary">Learn more</Button>
              </Link>

            </Box>
          </Flex>

          <Flex
            bg="#000"
            color="#fff"
          >
            
           

            <Box p="40px">
                <Heading type="h1" as="h1" color="brand.secondary">
               Job Seekers and man power finders ( Employment Support)
                  
                </Heading>
         

            <Text>
           
For organizations who are invested in human capital development, and are
 looking to establish highly effective career development programs designed to 
 empower people with in-demand skills 
and have them subsequently integrated into decent and dignified jobs.
            </Text>

         
          </Box>
          </Flex>
        </Flex>
      </Section>


       {/* long text one col  */}
      <Section mb={20} px={6} bg="#58181f" color="#fff">
        
            
       

         
      </Section>

      {/* Why Patronize us? */}
      <Section px={6} pt={20} pb={{ base: 0, lg: 20 }}>
        <Flex justifyContent="center" maxW={{ lg: "1150px", xl: "1200px" }} mx="auto">
          <Heading type="h2" color="brand.secondary" maxW="900px">
          ONE CLICK AWAY TO FINDING YOUR DREAM  JOB OR CREATE ONE THROUGH ENTREPRENEURSHIP AND SKILLS ACQUISITION.
      
          </Heading>

          
        </Flex>
        <Center>
              <Link mute href="/signup">
                <Button variant="primary">GET STARTED</Button>
              </Link>
        </Center>
        
      </Section>


      <Section bg="#f1f1f1" px={6} pt={20} pb={{ base: 0, lg: 20 }}>
        <Flex justifyContent="center" maxW={{ lg: "1150px", xl: "1200px" }} mx="auto">
          <Heading type="h2" color="brand.secondary" maxW="900px">
          Learn at your own pace, hire a reputable vetted  responsive employer and lots more...

          </Heading>

          
        </Flex><br/>

        <Center>
        <Text>Looking to build entrepreneurship programs that ensure a conscious approach 
            is applied towards developing ideas into startups and startups into profitable businesses? 
            Leverage ImpactXplorer to build intelligent processes that assess,
             train and support entrepreneurs on their path towards building scalable businesses.</Text>
        </Center>
      </Section>












      <Section
        maxW={breakpoints.xxl}
        bg="brand.primaryLight"
        px={6}
        py={{ base: 10, lg: 20 }}
      >
        <Flex justifyContent="center">
          <Flex alignItems="" mr={{ lg: 16 }}>
            <Box pt={6} pb={{ lg: "45px" }}>
              <Box maxW="500px">
                <Heading type="h1" as="h1" color="brand.secondary">
                Hiring the best candidate for the job just got easier.
                  
                </Heading>

                <Text type="lg-regular" mb={{ base: 10, md: "30px" }}>
                Powered by AI and expert knowledge from industrial psychologists,
                 our assessments tools evaluate for personality traits you care about to 
                ensure that your candidates or beneficiaries are well suited for your program.


                </Text>
              </Box>
              <Link mute href="/signup">
                <Button variant="primary">Create an Account</Button>
              </Link>

             
            </Box>
          </Flex>

          <Flex
            flexShrink={0}
            alignSelf="center"
            d={{ base: "none", lg: "flex" }}
            w={{ lg: "550px", xl: "600px" }}
            h={{ lg: "350px", xl: "400px" }}
            pos="relative"
          >
            <Image
              pos="absolute"
              w="100%"
              h="300px"
              src="/img/matchingemployees.jpg"
             boxShadow="-50px 50px 25px rgba(0, 0, 0, .08)"
            />
          </Flex>
        </Flex>
      </Section>



     
    

      {/* Earn as a marketer, Earn as a customer */}
      <Section py={20} maxW={breakpoints.xxl} bg="#FFB973">
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent="center"
          px={6}
        >
          <Flex
            justifyContent={{ base: "center", md: "flex-start" }}
            flexShrink="0"
            mb={{ base: 5, md: 0 }}
            mr={{ md: 10, lg: 16 }}
            //
          >
            <Image
              src="/img/talentsource.jpg"
              w={{ base: "280px", md: "325px", lg: "425px", xl: "525px" }}
              h={{ base: "305px", md: "350px", lg: "350px", xl: "300px" }}
              boxShadow="50px 50px 25px rgba(0, 0, 0, .03)"
            />
          </Flex>

          <Box textAlign={{ base: "left", md: "right" }} maxW="600px">
            <Heading type="h3" color="brand.secondary" mb={10}>
              
Talent Sourcing & work opportunities.
            </Heading>

            <Box color="brand.black1">
              <Text mb={6} type="lg-regular">
              Quickly find skilled talent for businesses in your entrepreneurship programs. 
              Allow recruiters (who already use Slatecube for recruting)
               to automatically recruit talents who meet their requirements, from your program.
               </Text>
            </Box>
          </Box>
        </Flex>
      </Section>


      <Section  py={20} maxW={breakpoints.xxl}>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent="center"
          px={6}
        >
          <Flex
            justifyContent={{ base: "center", md: "flex-start" }}
            flexShrink="0"
            mb={{ base: 5, md: 0 }}
            order={{ base: 0, md: 1 }}
            ml={{ md: 10, lg: 16 }}
          >
            <Image
              src="/img/skillacquisition.jpg"
              w={{ base: "280px", md: "325px", lg: "425px", xl: "525px" }}
              h={{ base: "305px", md: "350px", lg: "350px", xl: "300px" }}
              boxShadow="-50px 50px 25px rgba(0, 0, 0, .03)"
            />
          </Flex>

          <Box textAlign="left" maxW="600px">
            <Heading type="h3" color="brand.secondary" mb={10} maxW="450px">
            Adapt or create new
training programmes.
            </Heading>

            <Box color="brand.black1">
              <Text type="lg-regular" mb={6}>
              Leverage our pre-built project-based online programmes that
               cover top skills in technology, business, digital marketing as 
               well as life skills and soft skills, or upload your own training programmes.


              </Text>
            </Box>

            <Box pt={8}>
              <Link mute href="/store">
                <Button variant="primary" mb={8}>
                  Explore our Programmes
                </Button>
              </Link>

              <Link
                href="/locations"
                d="flex"
                w="fit-content"
                alignItems="center"
                color="brand.primary"
              >
                <Text mb={0} mr={2}>
                  Find a course
                </Text>

             
              </Link>
            </Box>
          </Box>
        </Flex>
      </Section>

      {/* Customer Satisfaction and Guarantee */}
      <Section bg="#f1f1f1" py={20} maxW={breakpoints.xxl}>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent="center"
          px={6}
        >
          <Flex
            justifyContent={{ base: "center", md: "flex-start" }}
            flexShrink="0"
            mb={{ base: 5, md: 0 }}
            mr={{ md: 10, lg: 16 }}
          >
            <Image
              src="/img/proworker.jpg"
              w={{ base: "280px", md: "325px", lg: "425px", xl: "525px" }}
              h={{ base: "305px", md: "350px", lg: "350px", xl: "300px" }}
              boxShadow="-50px 50px 25px rgba(0, 0, 0, .03)"
            />
          </Flex>

          <Box textAlign={{ base: "left", md: "right" }} maxW="600px">
            <Heading type="h3" color="brand.secondary" mb={10}>
            Guarantee Customer Satisfaction .
            </Heading>

            <Box color="brand.black1" type="lg-regular">
              <Text mb={6} type="lg-regular">
                With over bla bla bla
                <Text as="span" type="lg-bold">
                  100%
                </Text>{" "}
                With over bla bla bla
                <Text as="span" type="lg-bold">
                  1k+
                </Text>{" "}
                With over bla bla bla
              </Text>
            </Box>
          </Box>
        </Flex>
      </Section>

      {/* Customer stories */}
      <Section  bg="blue.900" px={6} py={20} maxW={breakpoints.xxl}>
        <Box as="header" maxW={breakpoints.xl} mx="auto" color='white'>
          <Heading type="h3" textAlign="center" color="brand.secondary">
          ABOUT ACE-TRACE<br />
          </Heading>

          <Text
            my={16}
            type="md-bold"
            d={{ base: "block"}}
            type="md-regular"
          >
            ACE-TRACE is a technology company that develops AI-powered SaaS (Software-as-a-service) 
            solutions for learning and workforce development. Governments, social impact organizations,
             businesses, and individuals leverage our 
            cutting-edge digital platforms to run their learning and workforce management programs.
          </Text>
        </Box>
       <hr/><br/>

        <Heading color='white' type="h3" textAlign="center" >
        PEOPLE, TECHNOLOGY, INNOVATION.<br />
          </Heading>

        <Box as="main" >
          <Flex justifyContent="center" alignItems="center" px={{ md: 2 }} pb={5} color='white'>
            <CustomerReview 
             contentText={"Leverage our cutting-edge technology solutions to develop and optimize your learning and workforce managemenet processes quickly."}
            contentTitle={"DIGITAL REVOLUTION"}
            />
            <CustomerReview 
                contentText={"Leverage our cutting-edge technology solutions to develop and optimize your learning and workforce managemenet processes quickly."}
                contentTitle={"DIGITAL REVOLUTION"}
            
            />
            <CustomerReview
                 contentText={"Leverage our cutting-edge technology solutions to develop and optimize your learning and workforce managemenet processes quickly."}
                 contentTitle={"DIGITAL REVOLUTION"}
            />
          </Flex>
        </Box>
      </Section>

      {/* This Month's pick */}
      <Section py={10} maxW={breakpoints.xxl} textAlign="center" h="300px" p="20px">
        <Box maxW={breakpoints.xl} mx="auto" px={6}>
          <Heading type="h3" color="brand.secondary">
          WANT TECHNOLOGY TO WORK FOR YOU? WE CAN HELP 
          </Heading>
          <Text>Some of the fastest and most scalable ways to solve the world's biggest problems are digital. We have built and continue to build platforms that allow forward-thinking 
            organizations to improve efficiency, increase knowledge and do good.</Text>

          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
        </Box>
      </Section>



      <Section
        maxW={breakpoints.xxl}
        bg="brand.primaryLight"
     
      
      >
        <Flex justifyContent="center">
          <Flex alignItems=""  bg="#f4f4f4">
            <Box p="40px"  pb={{ lg: "45px" }} color="purple">
              <Box >
                <Heading type="h1" as="h1" color="purple">
                Growth Programmes.
                  
                </Heading>

                <Text type="lg-regular" mb={{ base: 10, md: "30px" }}>
                For entities looking to design effective programs and activities 
                (which can be delivered on-site or remotely) to empower entrepreneurs 
                with relevant business skills,
                 networking opportunities and tailored support on their entrepreneurial journey.
                </Text>
              </Box>
              <Link mute href="/signup">
                <Button variant="primary">Learn more</Button>
              </Link>

       
            </Box>
          </Flex>

          <Flex
            bg="#171923"
            color="#fff"
            h="500px"
          >
            
           

            <Box p="40px">
                <Heading type="h1" as="h1" color="brand.secondary">
                Speak with a representative .
                  
                </Heading>
         

            <Text>
           
            If you'd like to talk about your needs and explore how best we 
            can be of help to you, please click the link below to schedule a meeting with us.
             We have solutions for government agencies, businesses, non-profits, students, and job seekers -
             and we will be more than happy to chat with you.
            </Text>

         
          </Box>
          </Flex>
        </Flex>
      </Section>

      
    
              {/* Last Section */}
      <Section>
        <Flex py={10} bg="brand.white" flexDir={{ base: "column", md: "row" }}>
          <Box px={10}>
            <Heading mb={{ base: 0, md: 5 }}>Delivery</Heading>

            <Text>
              Our courier delivery will safely deliver your order right next to
              your door
            </Text>
          </Box>

          <Box px={10} borderLeft={{ base: "0", md: "1px solid #eee" }}>
            <Heading mb={{ base: 0, md: 5 }}>Warranty</Heading>

            <Text>
              Certified equipment with on official guarantee from the
              manufacturer.
            </Text>
          </Box>

          <Box px={10} borderLeft={{ base: "0", md: "1px solid #eee" }}>
            <Heading mb={{ base: 0, md: 5 }}>Payment</Heading>

            <Text>
              You can pay for your purchase in cash, by card, by bank transfer
              or installmentally.
            </Text>
          </Box>

          <Box px={10} borderLeft={{ base: "0", md: "1px solid #eee" }}>
            <Heading mb={{ base: 0, md: 5 }}>Return</Heading>

            <Text>
              Returns are made within 14 days after purchase, in accordance with
              applicable law.
            </Text>
          </Box>
        </Flex>
      </Section>

     
         
    </Layout>

     
  );
};

export default HomePage;
