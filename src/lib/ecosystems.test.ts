import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ECOSYSTEMS,
  SLIDES_CONFIG,
  VALUE_PILLARS,
  getEcosystemBySlug,
  HOLDING_TITLE,
} from '../config/ecosystems.config';

test('ECOSYSTEMS defines exactly 4 required sub-platforms', () => {
  assert.equal(ECOSYSTEMS.length, 4);

  const slugs = ECOSYSTEMS.map((e) => e.slug);
  assert.deepEqual(slugs, [
    'real-estate',
    'technical-services',
    'wellness-lifestyle',
    'custom-manufacturing',
  ]);
});

test('Each ecosystem adheres strictly to content and data specifications', () => {
  for (const eco of ECOSYSTEMS) {
    assert.ok(eco.slug.length > 0, `Slug must be defined for ${eco.slug}`);
    assert.ok(eco.title.length > 0, `Title must be defined for ${eco.slug}`);
    assert.ok(eco.tagline.length > 0, `Tagline must be defined for ${eco.slug}`);
    assert.ok(
      eco.macroVision.length > 50,
      `macroVision must be a dignified paragraph for ${eco.slug}`
    );
    assert.equal(
      eco.coreValues.length,
      3,
      `Each ecosystem must have exactly 3 macro values (${eco.slug})`
    );
    for (const val of eco.coreValues) {
      assert.ok(val.title.length > 0, 'Value title must be non-empty');
      assert.ok(val.description.length > 0, 'Value description must be non-empty');
    }
    assert.ok(
      eco.externalPlatformUrl.startsWith('http'),
      `externalPlatformUrl must be a valid URL for ${eco.slug}`
    );
  }
});

test('getEcosystemBySlug retrieves the correct ecosystem configuration', () => {
  const realEstate = getEcosystemBySlug('real-estate');
  assert.ok(realEstate);
  assert.equal(realEstate?.indexNumber, '۰۱');

  const technical = getEcosystemBySlug('technical-services');
  assert.ok(technical);
  assert.equal(technical?.indexNumber, '۰۲');

  const invalid = getEcosystemBySlug('non-existent');
  assert.equal(invalid, undefined);
});

test('SLIDES_CONFIG specifies 4 distinct macro slides', () => {
  assert.equal(SLIDES_CONFIG.length, 4);
  assert.equal(SLIDES_CONFIG[0].id, 'vision');
  assert.equal(SLIDES_CONFIG[1].id, 'philosophy');
  assert.equal(SLIDES_CONFIG[2].id, 'ecosystems');
  assert.equal(SLIDES_CONFIG[3].id, 'contact');
});

test('VALUE_PILLARS specifies the 3 macro doctrines', () => {
  assert.equal(VALUE_PILLARS.length, 3);
  assert.equal(VALUE_PILLARS[0].number, '۰۱');
  assert.equal(VALUE_PILLARS[1].number, '۰۲');
  assert.equal(VALUE_PILLARS[2].number, '۰۳');
});

test('HOLDING_TITLE and HOLDING_KEY_METRICS adhere to upgraded brand standards', () => {
  assert.ok(HOLDING_TITLE.length > 0);
  assert.notEqual(HOLDING_TITLE, '[ نام هلدینگ ]');
  assert.ok(HOLDING_TITLE.includes('بُرهان') || HOLDING_TITLE.includes('برهان'));
});
