import { Module } from '../types';

export const MODULES: Module[] = [
  {
    id: 'breath-magic-1',
    title: '5 Rare Breath Magic Techniques',
    category: 'breathwork',
    level: 'novice',
    intent: 'Awaken subtle powers through breath control',
    tags: ['breathwork', 'pranayama', 'energy'],
    shortSummary: 'Ancient techniques to melt the mind into silence and burn away pain.',
    description: 'A collection of 5 rare techniques including Kumbhaka of Silence and Spine Flame Breath.',
    duration: '15 mins',
    isPremium: false,
    status: 'published',
    source: '5-Rare-Breath-Magic-Techniques.pdf',
    content: [
      { type: 'text', value: 'These techniques awaken subtle powers through breath.' },
      { type: 'step', value: { title: 'Kumbhaka of Silence', description: 'Inhale 6s, Hold 12s, Exhale 6s. Repeat 7 rounds.' } },
      { type: 'timer', value: { label: 'Inhale', duration: 6, type: 'inhale' } },
      { type: 'timer', value: { label: 'Hold', duration: 12, type: 'hold' } },
      { type: 'timer', value: { label: 'Exhale', duration: 6, type: 'exhale' } },
      { type: 'text', value: 'Whisper Breath: Inhale like sipping through a straw, exhale with "Hmmmm".' },
      { type: 'text', value: 'Spine Flame Breath: Visualize flame rising along spine on inhale, spreading light on exhale.' },
      { type: 'text', value: 'The Shaman’s Triangle: 3 sharp inhales, hold & tap sternum, exhale with sound.' },
      { type: 'text', value: 'The Quantum Pause: Pause between inhale and exhale. Let awareness rest.' }
    ]
  },
  {
    id: 'agni-marana-tantra',
    title: 'Agni Marana Tantra',
    category: 'tantra',
    tradition: 'Vama Marga',
    level: 'master',
    intent: 'Fire-Induced Destruction (Historical/Scholarly)',
    tags: ['marana', 'tantra', 'fire', 'restricted'],
    shortSummary: 'A standardized format of Putli Vidya Marana Tantra focused on fire.',
    description: 'Historical study of Agni Marana rituals, prerequisites, and ingredients.',
    warnings: ['Restricted scholarly content', 'Harm-sensitive', 'For educational purposes only'],
    prerequisites: ['Initiation (Diksha)', 'Vratam (3 days silence/celibacy)'],
    isPremium: true,
    status: 'restricted',
    source: 'Agni-Marana-Tantra.pdf',
    content: [
      { type: 'warning', value: 'This content is for historical and scholarly research only. Do not attempt.' },
      { type: 'text', value: 'Conditions: Ashtami or Amavasya during Krishna Paksha at Midnight.' },
      { type: 'text', value: 'Ingredients: Dry coconut shell, Mustard oil, Red chilies, Pippali, Camphor, Ghee.' }
    ]
  },
  {
    id: 'baglamukhi-sadhana',
    title: 'Baglamukhi Sadhana',
    category: 'doctrine',
    tradition: 'Maha Vidya',
    level: 'adept',
    intent: 'Stambhan (Paralysis/Immobilization)',
    tags: ['shakti', 'mahavidya', 'baglamukhi'],
    shortSummary: 'The 8th Mahavidya embodying the power of Stambhan.',
    description: 'Detailed guide on the form, weapons, and purpose of Mata Baglamukhi.',
    isPremium: false,
    status: 'published',
    source: 'SADHANAs-and-KRIYAs-All.pdf',
    content: [
      { type: 'text', value: 'Mata Baglamukhi is Pitambara Devi, the yellow goddess.' },
      { type: 'text', value: 'Purpose: Destruction of the wicked and protection of devotees.' },
      { type: 'text', value: 'Mantra: Om Hleem Baglamukhi Sarva Dushtanam Vacham Mukham Padam Stambhaya Jivham Keelaya Buddhim Vinashaya Hleem Om Svaha.' }
    ]
  },
  {
    id: 'stambhana-marana',
    title: 'Stambhana Marana',
    category: 'tantra',
    tradition: 'Naga Tantra / Kali Kula',
    level: 'master',
    intent: 'The Freezing Death Ritual (Historical/Scholarly)',
    tags: ['marana', 'stambhana', 'restricted'],
    shortSummary: 'A paralytic form of Marana that gradually immobilizes the body.',
    description: 'Scholarly analysis of the "Freezing Death" ritual and its prerequisites.',
    warnings: ['Restricted scholarly content', 'Harm-sensitive', 'For educational purposes only'],
    isPremium: true,
    status: 'restricted',
    source: 'Stambhana-Marana-The-Freezing-Death-Ritual.pdf',
    content: [
      { type: 'warning', value: 'This content is for historical and scholarly research only. Do not attempt.' },
      { type: 'text', value: 'Conditions: Paush, Magha, or Kartik months. Nighttime or Brahma Muhurta.' }
    ]
  },
  {
    id: 'nimbu-sadhana',
    title: 'Nimbu Mantra Siddhi',
    category: 'ritual',
    tradition: 'Folk Tantra',
    level: 'novice',
    intent: 'Lemon-based energy work and protection',
    tags: ['nimbu', 'vashikaran', 'protection'],
    shortSummary: 'Ancient folk practices using lemons for energy clearing and protection.',
    description: 'A manual on how lemons are used in various Tantric rituals for positive outcomes.',
    isPremium: false,
    status: 'published',
    source: 'Nimbu_Mantra_Siddhi_Sadhana_Manual.pdf',
    content: [
      { type: 'text', value: 'Lemons are powerful absorbers of negative energy.' },
      { type: 'step', value: { title: 'Energy Clearing', description: 'Place 4 lemons in the corners of your room to absorb stagnant energy.' } }
    ]
  },
  {
    id: 'aghora-diksa',
    title: 'Aghora Diksa (Initiation)',
    category: 'doctrine',
    tradition: 'Aghora',
    level: 'master',
    intent: 'Understanding the path of the Aghori',
    tags: ['aghora', 'shiva', 'initiation'],
    shortSummary: 'A deep dive into the initiation rites and philosophy of the Aghora path.',
    description: 'Historical and philosophical study of Aghora Diksa, focusing on non-duality.',
    warnings: ['Advanced philosophical concepts', 'Requires mental stability'],
    isPremium: true,
    status: 'published',
    source: 'Aghora-Diksa.pdf',
    content: [
      { type: 'text', value: 'Aghora is the path of the "non-terrifying". It is about seeing the divine in everything.' }
    ]
  },
  {
    id: 'dhumavati-sadhana',
    title: 'Dhumavati Sadhana',
    category: 'doctrine',
    tradition: 'Maha Vidya',
    level: 'adept',
    intent: 'Conflict Resolution and Obstacle Removal',
    tags: ['shakti', 'mahavidya', 'dhumavati'],
    shortSummary: 'The 7th Mahavidya representing the smoke, the widow, and the void.',
    description: 'Guide to Dhumavati Sadhana for destroying sorrows and removing obstacles.',
    isPremium: true,
    status: 'published',
    source: 'SADHANAs-and-KRIYAs-All.pdf',
    content: [
      { type: 'text', value: 'Dhumavati is Parvati\'s vast and protective form.' },
      { type: 'text', value: 'Mantra: Om Dhum Dhum Dhumavati Phat Svaha.' }
    ]
  },
  {
    id: 'soham-yoga',
    title: 'Soham Yoga: The Yoga of the Self',
    category: 'breathwork',
    tradition: 'Vedanta / Nath',
    level: 'novice',
    intent: 'Self-Realization through Breath',
    tags: ['soham', 'yoga', 'mantra', 'breath'],
    shortSummary: 'The natural mantra of the breath: "So" on inhale, "Ham" on exhale.',
    description: 'A guided practice for the Soham mantra, the sound of the soul.',
    isPremium: false,
    status: 'published',
    source: 'Soham_Yoga_Yoga_of_the_Self.pdf',
    content: [
      { type: 'text', value: 'Soham means "I am That". It is the sound of your own breath.' },
      { type: 'step', value: { title: 'The Natural Mantra', description: 'Inhale mentally saying "So", exhale mentally saying "Ham".' } },
      { type: 'timer', value: { label: 'So (Inhale)', duration: 4, type: 'inhale' } },
      { type: 'timer', value: { label: 'Ham (Exhale)', duration: 4, type: 'exhale' } }
    ]
  },
  {
    id: 'occult-tarot',
    title: 'The Occult Tarot: Symbolism & Myth',
    category: 'doctrine',
    tradition: 'Hermetic / Western Occult',
    level: 'adept',
    intent: 'Decoding the Major Arcana',
    tags: ['tarot', 'symbolism', 'divination', 'hermetic'],
    shortSummary: 'A deep dive into the esoteric meanings of the Tarot deck.',
    description: 'Explore the archetypal journey of the Fool through the 22 Major Arcana.',
    isPremium: true,
    status: 'published',
    source: 'The_Occult_Tarot.pdf',
    content: [
      { type: 'text', value: 'The Tarot is a visual representation of the path to enlightenment.' },
      { type: 'text', value: 'The Fool (0): The beginning of the journey, pure potential, the leap of faith.' },
      { type: 'text', value: 'The Magician (I): Mastery over the elements, as above so below.' }
    ]
  },
  {
    id: 'western-astrology',
    title: 'Western Astrology: Doctrine & Tools',
    category: 'astrology',
    tradition: 'Western',
    level: 'novice',
    intent: 'Understanding the Zodiac',
    tags: ['astrology', 'zodiac', 'planets', 'houses'],
    shortSummary: 'A foundational guide to planets, signs, and houses in Western Astrology.',
    description: 'Learn how to interpret your birth chart and the movement of the stars.',
    isPremium: false,
    status: 'published',
    source: 'Western_Astrology_by_Dr_Anil_Kumar_Porwal.pdf',
    content: [
      { type: 'text', value: 'Astrology is the study of the relationship between celestial bodies and earthly events.' },
      { type: 'text', value: 'The 12 Signs: Aries to Pisces, representing different archetypal energies.' }
    ]
  },
  {
    id: 'shambhala-doctrine',
    title: 'The Book of Shambhala',
    category: 'doctrine',
    tradition: 'Tibetan Buddhism',
    level: 'master',
    intent: 'Exploring the Hidden Kingdom',
    tags: ['shambhala', 'kalachakra', 'tibetan', 'mythology'],
    shortSummary: 'The prophecy and spiritual reality of the hidden kingdom of Shambhala.',
    description: 'A study of the Kalachakra Tantra and the path to the enlightened realm.',
    isPremium: true,
    status: 'published',
    source: 'Book_of_Shambhala.pdf',
    content: [
      { type: 'text', value: 'Shambhala is not just a physical place, but a state of consciousness.' },
      { type: 'text', value: 'The Kalachakra Tantra is the key to entering the Shambhala realm.' }
    ]
  },
  {
    id: 'psychic-skills',
    title: 'Awaken Your Intuition: Psychic Skills',
    category: 'ritual',
    tradition: 'Modern Occult',
    level: 'novice',
    intent: 'Developing Extra-Sensory Perception',
    tags: ['psychic', 'intuition', 'clairvoyance', 'perception'],
    shortSummary: 'Progressive drills to awaken your latent psychic abilities.',
    description: 'Practical exercises for clairvoyance, clairsentience, and intuition.',
    isPremium: false,
    status: 'published',
    source: 'Awaken_Your_Intuition_Psychic_Skills.pdf',
    content: [
      { type: 'text', value: 'Everyone has latent psychic potential. It just needs training.' },
      { type: 'step', value: { title: 'The Third Eye Visualization', description: 'Close your eyes and visualize a blue flame in the center of your forehead.' } }
    ]
  },
  {
    id: 'yantra-symbolism',
    title: 'Yantras: Sacred Diagrams',
    category: 'doctrine',
    tradition: 'Vedic / Tantric',
    level: 'adept',
    intent: 'Decoding Sacred Geometry',
    tags: ['yantra', 'geometry', 'symbolism', 'meditation'],
    shortSummary: 'The visual language of the divine: Understanding Yantras.',
    description: 'A guide to the geometry, colors, and mantras of sacred Yantras.',
    isPremium: true,
    status: 'published',
    source: 'Yantras.pdf',
    content: [
      { type: 'text', value: 'A Yantra is a geometric representation of a deity or cosmic energy.' },
      { type: 'text', value: 'The Bindu: The central point, representing the source of all creation.' }
    ]
  }
];
