import { Affix, Button, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { VoidFunctionComponent } from 'react';
import { ChevronUp } from 'tabler-icons-react';

interface ScrollToTopButtonProps {}

const ScrollToTopButton: VoidFunctionComponent<ScrollToTopButtonProps> = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Button
            variant="light"
            radius="xl"
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
          >
            <ChevronUp />
          </Button>
        )}
      </Transition>
    </Affix>
  );
};

export default ScrollToTopButton;
