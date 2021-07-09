import "./notespage.styles.scss"
import Basepage from "../basepage/basepage.component"
import Feedback from "../../components/feedback/feedback.component"

function Notespage(props) {
  return (
    <Basepage>
      <Feedback />
      <div className="notes__title">Atomic structure - Notes</div>
      <div className="notes__content">
        <div className="spec__text">
          <b>1.1.1</b> Atoms, elements and compounds • use the names and symbols
          of the first 20 elements in the periodic table, the elements in Groups
          1 and 7, and other elements in this specification • name compounds of
          these elements from given formulae or symbol equations • write word
          equations for the reactions in this specification • write formulae and
          balanced chemical equations for the reactions in this specification.
        </div>
        <hr />
        <div className="spec__title">Atoms: The Building Blocks of Matter</div>
        <ul>
          <li>
            All substances are made of tiny particles of matter called atoms
            which are the building blocks of all matter.
          </li>
          <li>
            Each atom is made of subatomic particles called protons, neutrons
            and electrons.
          </li>
          <li>
            The protons and neutrons are located at the centre of the atom,
            which is called the nucleus.
          </li>
          <li>
            The electrons move very fast around the nucleus in orbital paths
            called shells.
          </li>
          <li>
            The mass of the electron is negligible, hence the mass of an atom is
            contained within the nucleus where the protons and neutrons are
            located.
          </li>
        </ul>
        <img src={"/assets/atom.png"} />
        <div className="spec__title">Chemical Symbols</div>
        <ul>
          <li>
            An element is a substance made of atoms that all contain the same
            number of protons (one type of atom) and cannot be split into
            anything simpler.
          </li>
          <li>
            So if you had 500g of pure carbon and divided it into 500 x 1g
            piles, each pile would contain the same substance and would not
            differ from any other pile.
          </li>
          <li>
            There is a limited number of elements and all elements are found on
            the Periodic Table eg. hydrogen, carbon, nitrogen.
          </li>
          <li>
            Each element is represented by its own unique symbol as seen on the
            Periodic Table e.g. N stands for nitrogen and for nitrogen only.
          </li>
          <li>
            Where a symbol contains two letters, the first one is always written
            in uppercase letters and the other in lowercase e.g. sodium is Na,
            not NA.
          </li>
          <li>
            The following elements must be written as molecules as they exist in
            nature as two atoms joined together: H2, N2, O2, F2, Cl2, Br2 and
            I2.
          </li>
          <li>
            The atomic number and mass number also shown on the Periodic Table.
          </li>
        </ul>
        <img src={"/assets/carbon.png"} />
        <ul>
          <li>
            Elements take part in chemical reactions in which new substances are
            made in processes that most often involve an energy change.
          </li>
          <li>
            In these reactions atoms combine together in fixed ratios that will
            give them full outer shells of electrons, often producing compounds.
          </li>
          <li>
            A compound is a pure substance made up of two or more elements
            chemically combined and which cannot be separated by physical means.
          </li>
          <li>
            The properties of compounds are usually very different from the
            elements that form them.
          </li>
          <li>
            There is an unlimited number of compounds and the chemical formula
            is what tells you the ratio of atoms in a compound.
          </li>
          <li>
            For example H2O is a compound containing 2 hydrogen atoms and 1
            oxygen atom.
          </li>
          <li>
            The chemical formula can be deduced from the relative number of
            atoms present.
          </li>
          <li>
            For example a molecule containing 3 atoms of hydrogen and 1 atom of
            nitrogen is NH3.
          </li>
          <li>
            Diagrams or models can also be used to represent the chemical
            formula.
          </li>
        </ul>
        <img src={"/assets/ammonia.png"} />
      </div>
    </Basepage>
  )
}

export default Notespage
