import PageContainer from '../components/ui/PageContainer';
import Header from '../components/ui/Header';
import Text from '../components/ui/Text';

export function About() {
  return (
    <PageContainer>
      <Header variant="title">About us</Header>
      <Text>
        Paraflex is a type of cabinet design that uses a Higher Order
        Quarter-Wave resonator system. It was developed to provide a more
        efficient and powerful alternative to traditional bass reflex and folded
        horn designs. The Paraflex system is designed to deliver a powerful,
        deep, and accurate bass response with minimal distortion. It is also
        capable of delivering high SPL levels with minimal power input.
      </Text>
      <Header variant="subtitle">
        Who are the creators of the Paraflex type system?
      </Header>
      <Text>
        The Paraflex concept is the brainchild of its founders: M. Morgan J., D.
        Morgan (Flex Tech Design), and J. Vansickle (Paragon Concepts).
      </Text>
      <Header variant="subtitle">
        Where does the name Paraflex come from?
      </Header>
      <Text>
        The name Paraflex is a fusion of two words: "Para" from Paragon Concepts
        and "Flex" from Flex Tech Design.
      </Text>
      <Header variant="subtitle"> What kind of system is a Paraflex?</Header>
      <Text>
        The Paraflex system is comprised of two parallel Quarter Wave Resonators
        that merge into a single exit chamber, known as the mouth. It consists
        of a Low Tuned Resonator (LTR) and a High Tuned Resonator (HTR),
        resulting in an efficient high-output SPL cabinet. The combination of
        LTR and HTR creates a high-pressure zone in front of the HTR chamber,
        enhancing cone control of the driver. Paraflex cabinets are typically
        slightly larger than other designs due to the need to tune both
        resonators and align their phases. However, once tuned, they deliver
        powerful and efficient performance.
      </Text>
      <Header variant="subtitle">What is a Higher Order Quarter-Wave?</Header>
      <Text>
        The term "Higher Order Quarter-Wave" describes a quarter-wave cabinet
        with multiple resonators.
      </Text>
      <Header variant="subtitle">Are there only Paraflex subwoofers?</Header>
      <Text>
        No, Paraflex extends beyond subwoofers to include mid-bass (kick-bins)
        and mid-range (tops) cabinet designs, available in single, double, or
        even triple configurations, all built on the same design principles.
      </Text>
      <hr className="my-8" />
      <Header variant="title">Practical Information</Header>
      <Header variant="subtitle"> Are braces required?</Header>
      <Text>
        Yes, good and sufficient bracing is necessary, especially for subwoofer
        designs. Failure to brace the cabinet can result in reduced efficiency
        and a raised F-3 due to mechanical losses. Bracing prevents panel
        flexing and resonances while strengthening the enclosure, which is
        crucial as Paraflex subwoofer enclosures experience significant
        pressures.
      </Text>
      <Header variant="subtitle">Are holes in braces required?</Header>
      <Text>
        No, holes in non-blocking braces for Paraflex subwoofer designs are
        primarily for aesthetic purposes or weight reduction. The impact on
        losses over the bandwidth is minimal. Compensating for lost volume can
        be achieved by adding some inner height to the cabinet design. In mid
        and top designs, solid braces may have some effect since sound-wave
        lengths are shorter and may influence the sound.
      </Text>
      <Header variant="subtitle">
        What is damping, stuffing, and padding used for?
      </Header>
      <Text>
        Damping or padding is used to reduce resonances and vibrations in
        cabinet panels, minimizing transmission or reflections. This is
        typically achieved with bitumen or felt-type layers that can be affixed
        to the inside of the cabinet. Filling, wadding, or stuffing involves
        adding fluffy polyfill to specific parts of the cabinet volume. For
        instance, in Paraflex subwoofers, polyfill is used in the LTR or HTR at
        specific locations to eliminate resonances at particular frequencies.
      </Text>
      <Header variant="subtitle">
        What does the Helmholtz resonator do in Paraflex designs?
      </Header>
      <Text>
        Helmholtz resonators are primarily used in mid-top design cabinets to
        tune or dampen specific frequencies, ensuring the cabinet's response is
        as flat as possible.
      </Text>
      <Header variant="subtitle">
        {' '}
        Do I need to round the edges of the panels inside the subwoofer cabinet?
      </Header>
      <Text>
        No, rounding the edges or making small alterations inside the subwoofer
        cabinet is unnecessary. Since lower frequencies have long waves (e.g.,
        100Hz = 3 meters), they won't be affected by small bumps or rounded
        edges.
      </Text>
    </PageContainer>
  );
}

export default About;
