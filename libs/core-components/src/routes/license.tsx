import Header from '../components/ui/Header';
import PageContainer from '../components/ui/PageContainer';
import Text from '../components/ui/Text';
import { Link } from 'react-router-dom';
import { Link as LinkUI } from '@nextui-org/react';

export function License() {
  return (
    <PageContainer>
      <Header>Creative Commons</Header>
      <Text>
        Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND
        4.0)
      </Text>
      <LinkUI
        as={Link}
        isExternal
        anchorIcon
        to="https://creativecommons.org/licenses/by-nc-nd/4.0/"
      >
        https://creativecommons.org/licenses/by-nc-nd/4.0/
      </LinkUI>
      <Text>You are free to:</Text>
      <Text>
        Share — copy and redistribute the material in any medium or format.
      </Text>
      <Text>
        The licensor cannot revoke these freedoms as long as you follow the
        license terms.
      </Text>
      <Text>Under the following terms:</Text>
      <Text>
        Attribution — You must give appropriate credit, provide a link to the
        license, and indicate if changes were made. You may do so in any
        reasonable manner, but not in any way that suggests the licensor
        endorses you or your use.
      </Text>
      <Text>
        NonCommercial — You may not use the material for commercial purposes.
      </Text>
      <Text>
        NoDerivatives — If you remix, transform, or build upon the material, you
        may not distribute the modified material.
      </Text>
      <Text>
        No additional restrictions — You may not apply legal terms or
        technological measures that legally restrict others from doing anything
        the license permits.
      </Text>
      <Text>Notices:</Text>
      <Text>
        You do not have to comply with the license for elements of the material
        in the public domain or where your use is permitted by an applicable
        exception or limitation.
      </Text>
      <Text>
        No warranties are given. The license may not give you all of the
        permissions necessary for your intended use. For example, other rights
        such as publicity, privacy, or moral rights may limit how you use the
        material.
      </Text>
      <Text>
        <LinkUI
          as={Link}
          isExternal
          anchorIcon
          to="https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode"
        >
          https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
        </LinkUI>
        - More information available on the last pages. HOQS grants you
        permission to build up to 4 cabinets of each design for personal use, if
        building more than 4 or selling any number of cabinets you must contact
        your Regional Director for an exception via License or Subscription.
      </Text>
      <Text>
        Reach out and connect with your HOQS Regional Support Contact about
        various forms of support which include answering questions, sourcing
        drivers, parts & materials, also to have cabinets & systems built for
        you, or being added to your regional group chat on Facebook, and
        connecting with various other resources & specialists to meet your
        needs!
      </Text>
      <Text>
        Contact your regional HOQS director for license grants and exceptions.
      </Text>
      <Text>
        <LinkUI
          as={Link}
          isExternal
          anchorIcon
          to="https://www.hoqs.com.au/contact"
        >
          https://www.hoqs.com.au/contact
        </LinkUI>
      </Text>
      <Text>
        For More information visit the Introduction post link on facebook:{' '}
        <LinkUI
          as={Link}
          isExternal
          anchorIcon
          to="https://www.facebook.com/groups/bassaz/permalink/5927999007215177"
        >
          https://www.facebook.com/groups/bassaz/permalink/5927999007215177
        </LinkUI>
      </Text>
      <Text>
        HOQS PARAFLEX was founded in coordination with Matthew Morgan J, Dustin
        Morgan and J Vansickle then developed by The HOQS development community.
      </Text>
    </PageContainer>
  );
}
