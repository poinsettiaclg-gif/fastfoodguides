const fs = require('fs');
const path = require('path');

const faqs = {
  'mcdonalds-first-day-training': [
    { question: 'What should I wear to my first day at McDonald\\\'s?', answer: 'Wear the uniform provided by your manager (usually a shirt and hat), dark pants (usually black slacks or jeans without rips), and slip-resistant shoes. Slip-resistant shoes are absolutely mandatory for safety.' },
    { question: 'Do you get paid for orientation at McDonald\\\'s?', answer: 'Yes, orientation and all training hours are fully paid at your normal hourly rate. It is illegal for any restaurant to require unpaid training.' },
    { question: 'What do you actually do on your first day?', answer: 'Your first day is mostly paperwork (I-9, W-4, direct deposit), watching training videos on an iPad or computer, getting a tour of the store, and maybe shadowing a crew member on a basic station like fries or the front register.' }
  ],
  'chick-fil-a-first-day-training': [
    { question: 'What should I wear to Chick-fil-A orientation?', answer: 'Business casual attire or your uniform if it was already provided. You must adhere to their strict grooming standards: clean-shaven (no facial hair), natural hair colors, and slip-resistant shoes.' },
    { question: 'What is the Chick-fil-A "Core 4"?', answer: 'The Core 4 is their foundational customer service model: Create eye contact, share a smile, speak with an enthusiastic tone, and stay connected to make it personal. You will learn this on day one.' },
    { question: 'Is Chick-fil-A training hard?', answer: 'The technical tasks are simple, but the pace and the rigid adherence to customer service standards (like always saying "my pleasure") can be an adjustment for new hires.' }
  ],
  'dominos-first-day-training': [
    { question: 'What happens on your first day at Domino\\\'s?', answer: 'You\\\'ll fill out onboarding paperwork, get a tour of the store, learn the POS system for taking orders, and likely start learning how to properly fold pizza boxes (which is harder than it looks to do quickly).' },
    { question: 'Do Domino\\\'s drivers get paid for training?', answer: 'Yes, delivery drivers are paid for all training hours, which usually includes riding along with an experienced driver to learn the delivery area and store procedures.' },
    { question: 'What is the uniform for Domino\\\'s?', answer: 'A Domino\\\'s provided shirt and hat, black or khaki pants/shorts, and closed-toe slip-resistant shoes. Drivers must also have a reliable vehicle and proof of insurance.' }
  ],
  'five-guys-first-day-training': [
    { question: 'What is the Five Guys uniform?', answer: 'Five Guys provides a red shirt and a hat or visor. You need to wear jeans without holes and slip-resistant shoes. They are very strict about the slip-resistant shoes due to the peanut oil.' },
    { question: 'Do you cook on your first day at Five Guys?', answer: 'Usually not. Your first day will involve watching the Five Guys University training videos, learning the prep processes (like cutting potatoes), and understanding their strict quality standards.' },
    { question: 'Is it hard to work at Five Guys?', answer: 'It is physically demanding because there are no freezers or microwaves—everything is prepped fresh daily. The pace during rushes is very fast, and the kitchen gets very hot.' }
  ],
  'starbucks-first-day-training': [
    { question: 'What is Starbucks orientation called?', answer: 'Starbucks orientation is often referred to as your "First Sip." It involves tasting coffee, learning about the company culture, and getting your apron.' },
    { question: 'What should I wear to Starbucks training?', answer: 'Wear the Starbucks dress code: a clean shirt in an approved color (black, white, grey, navy), dark pants, and slip-resistant shoes. Your hair must be tied back and you cannot wear nail polish or watches/bracelets for food safety reasons.' },
    { question: 'How long does Starbucks barista training take?', answer: 'The formal training program usually takes about two weeks of shadowing and guided practice before you are fully comfortable working a bar position alone during a rush.' }
  ],
  'subway-first-day-training': [
    { question: 'What do you do on your first day at Subway?', answer: 'You will complete onboarding paperwork, watch Subway University training videos, and start learning the formulas for building sandwiches on the line.' },
    { question: 'Is it hard to memorize the Subway menu?', answer: 'It takes practice, but the "formulas" (how many slices of meat/cheese go on a 6-inch vs footlong) are standardized. You will pick it up quickly through repetition.' },
    { question: 'What is the Subway uniform?', answer: 'A Subway provided shirt and hat/visor, black or khaki pants, and slip-resistant shoes. You will also wear an apron and gloves whenever on the line.' }
  ],
  'taco-bell-first-day-training': [
    { question: 'What should I expect on my first day at Taco Bell?', answer: 'After paperwork and videos, you will likely start on the "starter" stations—either the front counter POS, or the fry station. You won\\\'t be expected to memorize the entire menu line build immediately.' },
    { question: 'What is the Taco Bell dress code?', answer: 'Taco Bell shirt and hat, dark pants or jeans (no rips), and black slip-resistant shoes. Hair must be restrained, and false nails/polish are usually prohibited.' },
    { question: 'Do you get free food working at Taco Bell?', answer: 'Most franchise locations offer a free meal during your shift or a significant discount, but policies vary by owner. Ask your manager on day one.' }
  ],
  'wendys-first-day-training': [
    { question: 'What happens at Wendy\\\'s orientation?', answer: 'You will fill out your I-9 and W-4, review the employee handbook, watch mandatory safety and training videos on the WeLearn system, and get your uniform.' },
    { question: 'What is the Wendy\\\'s uniform?', answer: 'Wendy\\\'s provides the shirt, hat, and sometimes an apron. You must provide dark pants (black slacks or jeans) and slip-resistant shoes.' },
    { question: 'Is it hard to work the Wendy\\\'s grill?', answer: 'The grill is demanding because Wendy\\\'s uses fresh beef. You have to learn the specific pressing and flipping techniques, but you won\\\'t be put there on your first day without extensive training.' }
  ]
};

const dir = path.join(__dirname, 'src', 'content', 'articles');

for (const [slug, faqArray] of Object.entries(faqs)) {
  const filePath = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if it already has faq
  if (content.includes('faq:')) {
    console.log(`Skipping ${slug}, already has faq`);
    continue;
  }
  
  // Generate YAML string for faq
  let faqYaml = 'faq:\n';
  for (const item of faqArray) {
    faqYaml += `  - question: "${item.question.replace(/"/g, '\\"')}"\n`;
    faqYaml += `    answer: "${item.answer.replace(/"/g, '\\"')}"\n`;
  }
  
  // Inject before the closing ---
  content = content.replace(/^---\s*$/m, `${faqYaml}---`);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${slug} with FAQ`);
}
