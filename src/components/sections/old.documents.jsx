<Tooltip label={'Documents'}>
<Box
  maxW={'100%'}
  w={'full'}
  bg={useColorModeValue('white', 'gray.800')}
  boxShadow={'2xl'}
  rounded={'md'}
  py={3}
  overflow={'hidden'}
>
  <Stack
    textAlign={'center'}
    p={3}
    color={useColorModeValue('gray.800', 'white')}
    align={'flex-start'}
  >
    <Text
      fontSize={'md'}
      fontWeight={500}
      bg={useColorModeValue('green.50', 'green.900')}
      p={2}
      px={3}
      color={'green.500'}
      rounded={'full'}
    >
      Documents
    </Text>
  </Stack>

  <Box
    bg={useColorModeValue('gray.50', 'gray.900')}
    px={6}
    py={1}
  >
    <HStack m={2}>
      {/* Request Letter */}
      <Document
        component={
          <GenerateRequestDoc
            id={`${param.id}`}
            initialvalue={requestdoc}
            callback={() =>
              setRefreshStateTracker(!refreshStateTracker)
            }
          />
        }
        label={'Request Letter'}
        tooltip={'request letter'}
        isSet={requestdoc}
      />

      {/* Completion Certification */}
      {type === 'Service' ? (
        <Document
          component={
            <GenerateSurveyReport
              id={`${param.id}`}
              initialvalue={surveyreport}
              callback={() =>
                setRefreshStateTracker(!refreshStateTracker)
              }
            />
          }
          label={'Survey Report'}
          tooltip={'Survey Report'}
          isSet={surveyreport}
        />
      ) : (
        <></>
      )}

      {/* Completion Certification */}
      {type === 'Service' ? (
        <Document
          component={
            <GenerateCompletionCertification
              id={`${param.id}`}
              initialvalue={completioncert}
              callback={() =>
                setRefreshStateTracker(!refreshStateTracker)
              }
            />
          }
          label={'Completion Certification'}
          tooltip={'Upload a Completion Certification Document'}
          isSet={completioncert}
        />
      ) : (
        <></>
      )}

      {/* Delivery Note */}
      {type === 'Product' ? (
        <Document
          component={
            <GenerateDeliveryNote
              id={`${param.id}`}
              initialvalue={deliverynote}
              callback={() =>
                setRefreshStateTracker(!refreshStateTracker)
              }
            />
          }
          label={'Delivery Note'}
          tooltip={'Delivery note'}
          isSet={deliverynote}
        />
      ) : (
        <></>
      )}
    </HStack>
  </Box>
</Box>
</Tooltip>
